from aglobell import settings
from helpers import random_hash
import requests
import shutil


def save_photo(image_url) -> str:
    r = requests.get(image_url, stream=True)
    extension = image_url[image_url.rfind('.'):]
    filename = settings.IMAGES_URL + random_hash.hash_string() + extension
    r.raw.decode_content = True

    with open('./' + filename, 'wb+') as f:
        shutil.copyfileobj(r.raw, f)

    return filename
