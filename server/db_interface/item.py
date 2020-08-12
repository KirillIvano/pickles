from app.models import Item, Product, Order
from typing import Dict, List


def add_product_objects(
        items: List[Dict[str, object]]
) -> List[Dict[str, object]]:
    """
    items
    in item structure add product object
    """
    for i, item in enumerate(items):
        items[i]['product'] = Product.objects.get(id=item["product_id"])
    return items


def create_many(order: Order, items: List[Dict[str, object]]) -> bool:
    for item in items:
        Item.objects.create(
            product=item['product'],
            order=order,
            quantity=item['quantity']
        )
    else:
        return False

    # noinspection PyUnreachableCode
    return True
