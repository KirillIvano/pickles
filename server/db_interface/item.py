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


def create_many(order: Order, items) -> bool:
    for item in items:
        product: Product = item['product']
        Item.objects.create(
            product=product,
            order=order,
            quantity=item['quantity'],
            price=product.price
        )
    else:
        return False

    # noinspection PyUnreachableCode
    return True
