import db_interface.tools
from app.models import Category


def every():
    return db_interface.tools.select_from_query(
        Category.objects.all(), [('id', 'id'), ('name', 'name')]
    )


def by_id(category_id):
    ...