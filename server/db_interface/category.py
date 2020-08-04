import db_interface.tools
from app.models import Category


def every():
    return list(db_interface.tools.select_from_query(
        Category.objects.all(), [('id', 'id'), ('name', 'name')]
    ))


def by_id(category_id):
    category = db_interface.tools.select_single(
        Category, 'category_id', category_id,
        [('id', 'id'), ('name', 'name')]
    )
    products = db_interface.tools.select_from_query(

    )
