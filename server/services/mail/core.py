from aglobell.settings import MAIL_PASSWORD, MAIL_LOGIN
import smtplib


def _create_mail_session():
    mail_session = smtplib.SMTP('smtp.gmail.com', 587)
    mail_session.starttls()
    mail_session.login(MAIL_LOGIN, MAIL_PASSWORD)
    return mail_session


session = _create_mail_session()


def send_mail(destination, subject, text):
    global session
    message = f"Subject: {subject}\n{text}"
    try:
        session.sendmail(
            from_addr=MAIL_LOGIN,
            to_addrs=destination,
            msg=message.encode('utf-8')
        )
    except smtplib.SMTPConnectError:
        session = _create_mail_session()
        session.sendmail(
            from_addr=MAIL_LOGIN,
            to_addrs=destination,
            msg=message.encode('utf-8')
        )
    return True
