import os
from pytubefix import YouTube, Playlist
import whisper
import torch, gc
import subprocess
import time

import psycopg2
from psycopg2.extras import RealDictCursor
from ollama import chat
from ollama import ChatResponse

# Database connection
def get_db_connection():
    return psycopg2.connect(
        dbname="snipscribe",
        user="root",
        password="root",
        host="localhost",
        port=5432
    )

def check_summary():
    print("Checking for pending summaries...")
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM "summaries" WHERE status = %s', ('PENDING',))
    summary = cursor.fetchone()
    if not summary:
        cursor.close()
        conn.close()
        return None
    
    cursor.execute('SELECT * FROM "videos" WHERE id = %s', (summary['video_id'],))
    video = cursor.fetchone()
    cursor.close()
    conn.close()
    return {
        'summary': summary,
        'video': video
    }

# Function to create a folder to store the downloaded files
def create_folder():
    print("Creating folder...")
    global path
    path = os.path.join(os.getcwd(), 'youtube_downloads')
    if not os.path.exists(path):
        os.makedirs(path)

# Function to download the video or playlist from pytube
def pytube_downloader(url, path):
    print("Downloading...")
    title = ''
    yt = YouTube(url, 'WEB')
    ys = yt.streams.get_audio_only()
    ys.download(path)
    title = yt.title

    return title

# Function to transcribe the audio files using Whisper
def transcribe_text(title, path):
    print("Transcribing...")
    transcription = ''
    audio_file = os.path.join(path, f"{title}.m4a")
    try:
        model = whisper.load_model("large", device="cuda")
        result = model.transcribe(audio_file)
        transcription = result["text"]
        del model
        del result
        clear_cache()
    except Exception as e:
        model = whisper.load_model("large", device="cpu")
        result = model.transcribe(audio_file)
        transcription = result["text"]
        del model
        del result
        clear_cache()

    os.remove(audio_file)
    return transcription

# Function to clear the cache from memory
def clear_cache():
    gc.collect()
    torch.cuda.empty_cache()

# Function to transcribe the audio file using Ollama
def summarize_text(trans):
    time.sleep(10)
    print("Summarizing...")
    # Start the Ollama server
    try:
        process = subprocess.Popen("ollama serve", shell=True)
    except Exception as e:
        print(f"Error starting Ollama server: {e}")

    # Wait a few seconds to ensure the server is up
    time.sleep(3)

    # Call the Ollama chat API
    response: ChatResponse = chat(model='qwen3', messages=[
            { 'role': 'system', 'content': '/no_think' },
            {
                'role': 'user',
                'content': f"Summarize this in its original language: {trans}"
            },
        ])

    clear_cache()
    print(response['message']['content'])
    return response['message']['content']

def save_summary(id, summary, title):
    print("Saving summary...")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE "summaries" SET status = %s, body = %s, title = %s WHERE id = %s',
        ('COMPLETED', summary, title, id)
    )
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_folder()
    while True:
        result = check_summary()
        if result:
            url = result['video']['url']
            id = result['summary']['id']
            title = pytube_downloader(url, path)
            transcription = transcribe_text(title, path)
            summary = summarize_text(transcription)  # Fixed here
            save_summary(id, summary, title)
        else:
            print("No pending summaries found.")
        time.sleep(60)