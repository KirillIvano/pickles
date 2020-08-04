from django.http import HttpResponse


def every() -> HttpResponse:
    ...


def by_id(category_id) -> HttpResponse:
    ...