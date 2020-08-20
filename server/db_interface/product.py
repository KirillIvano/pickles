import db_interface.tools
from app.models import Product, ProductImage, ProductInfo
from typing import List, Dict


FIELDS = [
    ('id', 'id'),
    ('name', 'name'),
    ('name_translit', 'verboseName'),
    ('category_id', 'categoryId'),
    ('price', 'price'),
    ('weight', 'weight'),
]


def preview_every(category_id: int = None) -> list:
    products = []
    if category_id is not None:
        query = Product.objects.filter(category_id=category_id)
    else:
        query = Product.objects.all()
    products_raw = db_interface.tools.select_from_query(query, FIELDS)

    for product in products_raw:
        product['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product['id'], [('image', 'image')]
        )
        products.append(product)
    return products


def preview_by_id(product_id: int) -> dict:
    product_instance = Product.objects.get(id=product_id)
    product = db_interface.tools.to_dict(product_instance, FIELDS)
    product['image'] = db_interface.tools.select_single(
        ProductImage, 'product__id', product['id'], [('image', 'image')]
    )
    return product


def preview_by_ids(product_ids: List[int]) -> list:
    product_instance = Product.objects.filter(id__in=product_ids)
    products = []
    for p in product_instance:
        product = db_interface.tools.to_dict(p, FIELDS)
        product['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product['id'], [('image', 'image')]
        )
        products.append(product)
    return products



def full_by_id(product_id: int) -> dict:
    product_instance: Product = Product.objects.get(id=product_id)
    product = db_interface.tools.to_dict(product_instance, FIELDS)
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


def exists(product_id: int) -> bool:
    try:
        Product.objects.get(id=product_id)
        return True
    except Product.DoesNotExist:
        return False
