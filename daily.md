# Snipscribe Daily

## Day 1
**YouTube Downloader:**

For this feature, I researched several libraries to find the best one for our use case. I came across a library called [**Pytube**](https://github.com/pytube/pytube), which I have used before. However, it is quite unstable; every now and then, I encounter HTTP Error 400, which led me to investigate the problem and attempt a solution.

During my search, I realized that this repository has not been updated since 2023, likely due to YouTube frequently changing its API, which causes Pytube to become unstable. I found someone who managed to solve it using the following code:

```python
from pytube.innertube import _default_clients
from pytube import cipher
import re

_default_clients["ANDROID"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["ANDROID_EMBED"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS_EMBED"]["context"]["client"]["clientVersion"] = "19.08.35"
_default_clients["IOS_MUSIC"]["context"]["client"]["clientVersion"] = "6.41"
_default_clients["ANDROID_MUSIC"] = _default_clients["ANDROID_CREATOR"]

def get_throttling_function_name(js: str) -> str:
    """Extract the name of the function that computes the throttling parameter.

    :param str js: The contents of the base.js asset file.
    :rtype: str
    :returns: The name of the function used to compute the throttling parameter.
    """
    function_patterns = [
        r'a\.[a-zA-Z]\s*&&\s*\([a-z]\s*=\s*a\.get\("n"\)\)\s*&&\s*'
        r'\([a-z]\s*=\s*([a-zA-Z0-9$]+)(\[\d+\])?\([a-z]\)',
        r'\([a-z]\s*=\s*([a-zA-Z0-9$]+)(\[\d+\])\([a-z]\)',
    ]
    for pattern in function_patterns:
        regex = re.compile(pattern)
        function_match = regex.search(js)
        if function_match:
            if len(function_match.groups()) == 1:
                return function_match.group(1)
            idx = function_match.group(2)
            if idx:
                idx = idx.strip("[]")
                array = re.search(
                    r'var {nfunc}\s*=\s*(\[.+?\]);'.format(
                        nfunc=re.escape(function_match.group(1))),
                    js
                )
                if array:
                    array = array.group(1).strip("[]").split(",")
                    array = [x.strip() for x in array]
                    return array[int(idx)]
    
    raise RegexMatchError(
        caller="get_throttling_function_name", pattern="multiple"
    )

cipher.get_throttling_function_name = get_throttling_function_name
```

This code essentially adjusts Pytube to work around YouTube’s changing codebase.

**Did it solve the problem?**  
Yes, and also no. It solved the issue temporarily, but after a few months, it broke again with the same error.

I then looked for an alternative and discovered that someone had created a library on top of Pytube named [**Pytubefix**](https://github.com/JuanBindez/pytubefix), which addresses some of Pytube's issues. This library fixed Error 400, and while I haven't extensively tested it yet, it seems to be somewhat more stable.

For the future I would like to add [yt-dlp](https://github.com/ytdl-org/youtube-dl) as a backup if Pytubefix fails at some point.

## Day 2
**Language Detection**

While looking at models on [Hugging Face](https://huggingface.co/), I found one that seemed easy to use and very accurate. It also includes Arabic detection, which was ideal for our needs. This [model](https://huggingface.co/speechbrain/lang-id-voxlingua107-ecapa) was trained on the VoxLingua107 dataset using [SpeechBrain](https://speechbrain.github.io/), and it uses the ECAPA-TDNN architecture.

**Accuracy:**
93.3%

It covers 107 different languages; for now, I will only be using English and Arabic, but we may add more in the future, so this choice is very future-proof.
