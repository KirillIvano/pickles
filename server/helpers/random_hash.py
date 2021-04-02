import random
import re
import os
from aglobell import settings
from django.db.models import Model


def hash_string() -> str:
    return "%032x" % random.getrandbits(128)


def hash_digital() -> str:
    s = "%.8f" % random.random()
    return s[2:]


def hash_filename(instance, filename):
    return settings.IMAGES_URL + hash_string() + '.' + \
           re.findall('\.(\w*)$', filename)[0]

