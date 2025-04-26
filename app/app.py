import os
from pytubefix import YouTube, Playlist
import whisper
import torch, gc
import ollama
import subprocess
import time

import psycopg2
from psycopg2.extras import RealDictCursor

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
    global path
    path = os.path.join(os.getcwd(), 'youtube_downloads')
    if not os.path.exists(path):
        os.makedirs(path)

# Function to download the video or playlist from pytube
def pytube_downloader(url, path):
    title = ''
    yt = YouTube(url, 'WEB')
    ys = yt.streams.get_audio_only()
    ys.download(path)
    title = yt.title

    return title

# Function to transcribe the audio files using Whisper
def transcribe_text(title, path):
    model = whisper.load_model("large")
    transcription = ''
    audio_file = os.path.join(path, f"{title}.m4a")
    result = model.transcribe(audio_file)
    transcription = result["text"]
    clear_cache()
    os.remove(audio_file)
    return transcription

# Function to clear the cache from memory
def clear_cache():
    gc.collect()
    torch.cuda.empty_cache()

# Function to transcribe the audio file using Ollama
def summarize_text(trans):
    # Start the Ollama server
    process = subprocess.Popen("ollama serve", shell=True)

    # Wait a few seconds to ensure the server is up
    time.sleep(3)

    # Pull the model (if not already available)
    subprocess.run(["ollama", "pull", "mistral-small3.1"])

    # Call the Ollama chat API
    response = ollama.chat(model='mistral-small3.1', messages=[
        {
            'role': 'user',
            'content': f"Summarize this in its original language: {trans}"
        },
    ])

    clear_cache()

    return response['message']['content']

def save_summary(id, summary, title):
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
            summary = summarize_text(transcription['transcription'])
            save_summary(id, summary, title)
        else:
            print("No pending summaries found.")
     


