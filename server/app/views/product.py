from django.http import HttpRequest, HttpResponse
from helpers.wrap_response import wrap_data, wrap_error
from app.models import *
import db_interface.product


def preview_every(request: HttpRequest) -> HttpResponse:
    # noinspection PyCallByClass,PyTypeChecker
    category_id = request.GET.get('categoryId', None)
    # noinspection PyCallByClass,PyTypeChecker
    product_ids_raw = request.GET.get('productIds', None)

    if product_ids_raw:
        product_ids_list = product_ids_raw.split(',')
        try:
            product_ids_list = [int(p) for p in product_ids_list]
            return wrap_data(
                {
                    'products': db_interface.product.preview_by_ids(
                        product_ids_list
                    )
                }
            )
        except ValueError:
            return wrap_error('Не удалось преобразовать id')

    products = db_interface.product.preview_every(category_id)
    return wrap_data({"products": products})


def preview_by_id(request: HttpRequest, product_id: int) -> HttpResponse:
    try:
        product = db_interface.product.preview_by_id(product_id)
        return wrap_data(data={'product': product})
    except Product.DoesNotExist:
        return wrap_error('Нет товара с таким id', 404)


def preview_by_ids(request: HttpRequest) -> HttpResponse:
    # noinspection PyCallByClass,PyTypeChecker
    product_ids_raw = request.GET.get('productIds', None)
    if product_ids_raw is None:
        return wrap_error('Нет параметра productIds')


def full_by_id(request: HttpRequest, product_weight_id: int) -> HttpResponse:
    try:
        product = db_interface.product.full_by_id(product_weight_id)
        return wrap_data({"product": product})
    except Product.DoesNotExist:
        return wrap_error('Товар с таким id не найден', 404)

