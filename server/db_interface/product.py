import db_interface.tools
from app.models import Product, ProductImage, ProductInfo, ProductWeight
from typing import List, Dict


FIELDS = [
    ('id', 'id'),
    ('name', 'name'),
    ('name_translit', 'verboseName'),
    ('category_id', 'categoryId'),
]


def preview_every(category_id: int = None) -> list:
    if category_id is not None:
        query = Product.objects.filter(category_id=category_id)
    else:
        query = Product.objects.all()
    products_raw = db_interface.tools.select_from_query(query, FIELDS)

    products = []
    for product in products_raw:
        product['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product['id'], [('image', 'image')]
        )
        for weight in ProductWeight.objects.filter(product_id=product['id']):
            product_weight = product.copy()
            product_weight['id'] = weight.id
            product_weight['weight'] = weight.weight
            product_weight['price'] = weight.price
            products.append(product_weight)
    return products


def preview_by_id(product_weight_id: int) -> dict:
    product_weight_instance = ProductWeight.objects.get(id=product_weight_id)
    product_instance = product_weight_instance.product
    product = db_interface.tools.to_dict(product_instance, FIELDS)
    product['image'] = db_interface.tools.select_single(
        ProductImage, 'product__id', product['id'], [('image', 'image')]
    )
    product['id'] = product_weight_instance.id
    product['weight'] = product_weight_instance.weight
    product['price'] = product_weight_instance.price

    return product


def preview_by_ids(product_weight_ids: List[int]) -> list:
    product_weight_instances = ProductWeight.objects.filter(
        id__in=product_weight_ids
    )
    products = []
    for product_weight in product_weight_instances:
        product_instance = product_weight.product
        product = db_interface.tools.to_dict(product_instance, FIELDS)
        product['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product['id'], [('image', 'image')]
        )
        product['id'] = product_weight.id
        product['weight'] = product_weight.weight
        product['price'] = product_weight.price
        products.append(product)

    return products


def full_by_id(product_weight_id: int) -> dict:
    product_weight_instance = ProductWeight.objects.get(id=product_weight_id)
    product_instance = product_weight_instance.product
    product = db_interface.tools.to_dict(product_instance, FIELDS)
    product['images'] = list(db_interface.tools.select(
        ProductImage,
        'product__id', product['id'],
        [('image', 'image')]
    ))
    product['info'] = list(db_interface.tools.select(
        ProductInfo,
        'product__id', product['id'],
        [('name', 'name'), ('value', 'value')]
    ))
    product['id'] = product_weight_instance.id
    product['weight'] = product_weight_instance.weight
    product['price'] = product_weight_instance.price
    return product
