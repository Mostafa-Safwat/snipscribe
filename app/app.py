import os
from pytubefix import YouTube, Playlist
import whisper
import torch, gc
import ollama
import subprocess
import time

url = ''

# Function to create a folder to store the downloaded files
def create_folder():
    global path
    path = os.path.join(os.getcwd(), 'youtube_downloads')
    if not os.path.exists(path):
        os.makedirs(path)

# Function to download the video or playlist from pytube
def pytube_downloader(url, path):
    titles = []
    if 'playlist' in url:
        pl = Playlist(url)
        for video in pl.videos:
            ys = video.streams.get_audio_only()
            ys.download(path)
            titles.append(video.title)
    else:
        yt = YouTube(url, 'WEB')
        ys = yt.streams.get_audio_only()
        ys.download(path)
        titles.append(yt.title)
    return titles

# Function to transcribe the audio files using Whisper
def transcribe_text(titles, path):
    model = whisper.load_model("large")
    transcriptions = []
    for title in titles:
        audio_file = os.path.join(path, f"{title}.m4a")
        result = model.transcribe(audio_file)
        transcriptions.append({
            'title': title,
            'transcription': result["text"]
        })
    return transcriptions

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

    return response['message']['content']

create_folder()
titles = pytube_downloader(url, path)
transcriptions = transcribe_text(titles, path)
clear_cache()
summarization = summarize_text(transcriptions[0]['transcription']) 
clear_cache()


