import db_interface.tools
from app.models import Category

FIELDS = [
    ('id', 'id'),
    ('name', 'name'),
    ('name_translit', 'verboseName')
]


def every():
    return list(db_interface.tools.select_from_query(
        Category.objects.all(), FIELDS
    ))


