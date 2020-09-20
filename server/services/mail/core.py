from aglobell.settings import *
from django.core.mail import send_mail as dj_send_mail


def get_receivers(order):
    receivers = [order.email]
    if DEBUG:
        receivers += EMAIL_DEBUG_RECEIVERS
    return receivers


def send_mail(receiver, subject, payload):
    print('sending mail to', receiver)
    dj_send_mail(
        subject=subject,
        from_email=EMAIL_HOST_USER,
        recipient_list=receiver,
        message=payload,
        html_message=payload
    )
