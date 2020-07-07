import smtplib
from email.mime.text import MIMEText

from settings import MAIL_HOST, MAIL_LOGIN, MAIL_PASSWORD, MAIL_PORT
from tasks import tasks

server = smtplib.SMTP_SSL(MAIL_HOST, MAIL_PORT)
server.login(MAIL_LOGIN, MAIL_PASSWORD)

def generate_message(address: str, text: str, title: str = '') -> MIMEText:
    message = MIMEText(text)

    message['From'] = MAIL_LOGIN
    message['To'] = address
    message['Subject'] = title

    return message

def send_message(address: str, text: str):
    msg = generate_message(text, address)
    
    server.sendmail(msg['From'], msg['To'], msg.as_string())