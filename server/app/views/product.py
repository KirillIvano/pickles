from django.http import HttpRequest, HttpResponse
from helpers.wrap_response import wrap_data, wrap_error
from app.models import *
import db_interface.product


def preview_every(request: HttpRequest) -> HttpResponse:
    # noinspection PyCallByClass,PyTypeChecker
    category_id = request.GET.get('categoryId', None)
    # noinspection PyCallByClass,PyTypeChecker
    retail = request.GET.get('retail', None)
    # noinspection PyCallByClass,PyTypeChecker
    product_ids_raw = request.GET.get('productIds', None)

    retail = {'true': True, 'false': False}.get(retail)
    if product_ids_raw:
        try:
            product_ids_list = [int(p) for p in product_ids_raw.split(',')]
            return wrap_data(
                {
                    'products': db_interface.product.preview_by_ids(
                        product_ids_list
                    )
                }
            )
        except ValueError:
            return wrap_error('Не удалось преобразовать id')

    products = db_interface.product.preview_every(category_id, retail)
    return wrap_data({"products": products})


def full_by_id(_: HttpRequest, product_weight_id: int) -> HttpResponse:
    try:
        product = db_interface.product.full_by_id(product_weight_id)
        return wrap_data({"product": product})
    except Product.DoesNotExist:
        return wrap_error('Товар с таким id не найден', 404)


def daily_wholesale(_: HttpRequest):
    return wrap_data({"product": db_interface.product.get_daily_wholesale()})