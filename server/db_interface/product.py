import db_interface.tools
from app.models import Product, ProductImage, ProductInfo

FIELDS = [
    ('id', 'id'),
    ('name', 'name'),
    ('name_translit', 'verboseName'),
    ('price', 'price'),
    ('weight', 'weight'),
]


def every(category_id: int = None) -> list:
    products = []
    if category_id is not None:
        products_raw = db_interface.tools.select_from_query(
            Product.objects.filter(category_id=category_id), FIELDS
        )
    else:
        products_raw = db_interface.tools.select_from_query(
            Product.objects.all(), FIELDS
        )

    for product in products_raw:
        product['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product['id'], [('image', 'image')]
        )
        products.append(product)
    return products


def by_id(product_id: int) -> dict:
    product = db_interface.tools.select_single(
        Product, 'id', product_id, FIELDS
    )
    if product is not None:
        product['images'] = list(db_interface.tools.select(
            ProductImage,
            'product__id', product_id,
            [('image', 'image')]
        ))
        product['info'] = list(db_interface.tools.select(
            ProductInfo,
            'product__id', product_id,
            [('name', 'name'), ('value', 'value')]
        ))
    return product
