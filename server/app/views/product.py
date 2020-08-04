from django.http import HttpRequest, HttpResponse
from helpers.wrap_response import wrap_data, wrap_error
from app.models import *
import db_interface.product


def every(request: HttpRequest) -> HttpResponse:
    # noinspection PyCallByClass,PyTypeChecker
    category_id = request.GET.get('categoryId', None)
    products = db_interface.product.every(category_id)
    return wrap_data(products)


def by_id(request: HttpRequest, product_id: int) -> HttpResponse:
    product = db_interface.product.by_id(product_id)
    if product is None:
        return wrap_error('Товар с таким id не найден', 404)
    return wrap_data(product)
