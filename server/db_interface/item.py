from app.models import Item, Product, ProductWeight, Order
from typing import Dict, List


def add_product_objects(
        items: List[Dict[str, object]]
) -> List[Dict[str, object]]:
    """
    items
    in item structure add product object
    """
    for i, item in enumerate(items):
        items[i]['product_weight'] = ProductWeight.objects.get(
            id=item["product_weight_id"]
        )
    return items


def create_many(order: Order, items) -> bool:
    for item in items:
        product_weight: ProductWeight = item['product_weight']
        Item.objects.create(
            product_weight=product_weight,
            order=order,
            quantity=item['quantity'],
            price=product_weight.price
        )
    else:
        return False

    # noinspection PyUnreachableCode
    return True
