
# Snipscribe
## Virtual Environment
**Installing Virtual Environment:**
```sh
sudo apt-get install -y python3-venv
```
**Creating Virtual Environment:**
```sh
python3 -m venv venv
```
**Activate the virtual environment:**
   - On Linux:
     ```sh
     source venv/bin/activate
     ```
   - On Windows:
     ```sh
     .\venv\Scripts\activate
     ```

## Installing Libraries

To install all the libraries listed in `requirements.txt`, run:

```bash
pip install -r requirements.txt
```

**Installing ffmpeg on Linux:**
```sh
sudo apt-get install ffmpeg
```

**Installing olama on Linux:**
```sh
curl -fsSL https://ollama.com/install.sh | sh
```
