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


def by_id(order_id, key) -> dict:
    order_instance = Order.objects.get(id=order_id, hash=key)
    status = order_instance.status.verbose_name
    items_result = []
    items_query = Item.objects.filter(order__id=order_id)
    total_price = 0
    for item in items_query:
        total_price += item.price * item.quantity
        items_result.append(
            {
                'productId': item.product_weight.id,
                'name': item.product_weight.product.name,
                'verboseName': item.product_weight.product.name_translit,
                'quantity': item.quantity,
                'price': item.price
            }
        )

    result = db_interface.tools.to_dict(
        order_instance,
        [
            ('id', 'id'),
            ('name', 'name'),
            ('phone', 'phone'),
            ('email', 'email'),
            ('address', 'address'),
            ('comment', 'comment'),
            ('datetime', 'date')
        ]
    )
    result['items'] = items_result
    result['totalPrice'] = total_price
    result['status'] = status
    return result
