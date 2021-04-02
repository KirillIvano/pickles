from aglobell.settings import HOST


def get_order_link(order):
    return f'{HOST}/order/{order.id}?key={order.hash}'
