import random
import re
import os
from aglobell import settings


def hash_string():
    return "%032x" % random.getrandbits(128)


def hash_filename(instance, filename):
    return settings.IMAGES_URL + hash_string() + '.' + \
           re.findall('\.(\w*)$', filename)[0]

