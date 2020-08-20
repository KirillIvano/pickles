from app.models import Order, Item, OrderStatus
import db_interface.item
import db_interface.tools


def create(
        name,
        phone,
        email,
        address,
        comment,
        items
):
    order = Order.objects.create(
        name=name,
        phone=phone,
        email=email,
        address=address,
        comment=comment,
        status=OrderStatus.objects.get(code='initial')
    )
    db_interface.item.create_many(order, items)
    return order


def by_digital_hash(digital_hash, key) -> dict:
    order_query = Order.objects.filter(hash_digital=digital_hash, hash=key)
    if len(order_query) == 0:
        return {}

    items_result = []
    items_query = Item.objects.filter(order__hash_digital=digital_hash)
    total_price = 0
    for item in items_query:
        total_price += item.price * item.quantity
        items_result.append(
            {
                'productId': item.product.id,
                'name': item.product.name,
                'verboseName': item.product.name_translit,
                'quantity': item.quantity,
                'price': item.price
            }
        )

    result = db_interface.tools.to_dict(
        order_query[0],
        [
            ('name', 'name'),
            ('phone', 'phone'),
            ('email', 'email'),
            ('address', 'address'),
            ('comment', 'comment'),
        ]
    )
    result['items'] = items_result
    result['totalPrice'] = total_price
    return result
