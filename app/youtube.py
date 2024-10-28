import os
from pytubefix import YouTube, Playlist

url = 'https://youtu.be/tiJI2np0SJo?si=ujg51upipcPUfqNU'

# Function to create a folder to store the downloaded files
def create_folder():
    global path
    path = os.path.join(os.getcwd(), 'youtube_downloads')
    if not os.path.exists(path):
        os.makedirs(path)

# Function to download the video or playlist from pytube
def pytube_downloader(url, path):
    if 'playlist' in url:
        pl = Playlist(url)
        for video in pl.videos:
            ys = video.streams.get_audio_only()
            ys.download(mp3=True)
            print(video.title)
    else:
        yt = YouTube(url)
        print(yt.title)
        ys = yt.streams.get_audio_only()
        ys.download(path, mp3=True)

if __name__ == '__main__':
    create_folder()
    pytube_downloader(url, path)