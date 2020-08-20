from django.http import HttpRequest
from helpers import wrap_response
import json


def validate_order(request: HttpRequest) -> bool:
    if len(request.body) == 0:
        return False

    body = json.loads(request.body)
    keys = [
        "name",
        "phone",
        "email",
        "address",
        "comment",
        "items",
    ]
    # try:
    for key in keys:
        if body.get(key) is None:
            return False

    if len(body.get('items')) == 0:
        return False

    for item in body.get('items'):
        product_id = item.get('productId')
        quantity = item.get('quantity')
        if product_id is None or quantity is None:
            return False

    return True
    # except json.JSONDecodeError:
    #     return False
