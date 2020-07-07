from .core import send_mail

def send_simple_message(address, text):
    send_mail(address, text)