from django.http import HttpResponse, HttpRequest
import db_interface.category
from helpers.wrap_response import wrap_data, wrap_error


def every(request: HttpRequest) -> HttpResponse:
    return wrap_data({"categories": db_interface.category.every()})


def by_id(request: HttpRequest, category_id) -> HttpResponse:
    ...