import torchaudio
from speechbrain.pretrained import EncoderClassifier

# Path to the audio file
file_location = ""

def detect_language(file_location):
  # Set the backend to ffmpeg
  torchaudio.set_audio_backend("ffmpeg") # you need to install ffmpeg first using `sudo apt-get install ffmpeg`

  # Load the pretrained model
  model = EncoderClassifier.from_hparams(
    "speechbrain/lang-id-voxlingua107-ecapa"
  )
  result = model.classify_file(file_location)

  # Extract the language name
  language = result[-1][0].split(": ")[1]

  return language

if __name__ == '__main__':
    print(detect_language(file_location))