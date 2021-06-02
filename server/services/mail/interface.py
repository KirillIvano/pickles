import smtplib
from services.mail.core import *
from helpers.generate_link import get_order_link


def handle_order_mailing(order, previous=None):
    print('handling order', order)

    if previous is not None:
        if previous.status == order.status:
            return

    order_status_mapping = {
        'initial': created,
        'canceled': canceled,
    }
    handler = order_status_mapping.get(order.status.code)
    if handler is not None:
        try:
            handler(order)
        except smtplib.SMTPException as e:
            print(f"Не смог отправить письмо: {e}")
            pass


def created(order):
    print('send created mail')
    link = f'<a href="{get_order_link(order)}">order #{order.id}</a>'
    send_mail(
        get_receivers(order),
        'Заказ создан | aglobell.ru',
        f"Ссылка на заказ: {link}"
    )


def canceled(order):
    print('send canceled mail')
    link = f'<a href="{get_order_link(order)}">order #{order.id}</a>'
    send_mail(
        get_receivers(order),
        'Заказ отменён | aglobell.ru',
        f"Ссылка на заказ: {link}"
    )




