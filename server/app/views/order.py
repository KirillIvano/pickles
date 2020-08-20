from django.http import HttpRequest, HttpResponse
from app.models import Order, Product
import db_interface.order
import db_interface.item
from helpers import wrap_response
from app.views.validators import order as validator
import json


def new(request: HttpRequest) -> HttpResponse:
    if not validator.validate_order(request):
        return wrap_response.wrap_error('Запрос не валидирован')

    body = json.loads(request.body)
    items = []
    for item in body.get('items'):
        items.append(
            {
                "product_id": item['productId'],
                "quantity": item['quantity']
            }
        )

    try:
        items = db_interface.item.add_product_objects(items)
    except Product.DoesNotExist:
        return wrap_response.wrap_error('Неправильный id продукта')

    order = db_interface.order.create(
        name=body.get("name"),
        phone=body.get("phone"),
        email=body.get("email"),
        address=body.get("address"),
        comment=body.get("comment"),
        items=items
    )

    return wrap_response.wrap_data(
        {'id': order.hash_digital, 'key': order.hash})


# noinspection PyArgumentList
def get(request: HttpRequest, digital_hash: str) -> HttpResponse:
    # noinspection PyCallByClass
    key = request.GET.get(key='key')
    if key is None:
        return wrap_response.wrap_error("Нет передан ключ", )

    instance = db_interface.order.by_digital_hash(digital_hash, key)
    if len(instance) == 0:
        return wrap_response.wrap_error("Нет заказа с таким номером", 404)

    return wrap_response.wrap_data({'order': instance})
