import db_interface.tools
from app.models import Product, ProductImage, ProductInfo, ProductWeight
from typing import List, Dict

PRODUCT_FIELDS = [
    ('name', 'name'),
    ('name_translit', 'verboseName'),
    ('category_id', 'categoryId'),
]
PRODUCT_WEIGHT_FIELDS = [
    ('id', 'id'),
    ('retail', 'retail'),
    ('weight', 'weight'),
    ('price', 'price'),
]


def preview_every(category_id: int = None, retail: bool = None) -> list:
    if category_id and retail is not None:
        product_weight_instances = ProductWeight.objects.filter(
            product__category__id=category_id,
            retail=retail
        )
    elif category_id:
        product_weight_instances = ProductWeight.objects.filter(
            product__category__id=category_id,
        )
    elif retail is not None:
        product_weight_instances = ProductWeight.objects.filter(
            retail=retail
        )
    else:
        product_weight_instances = ProductWeight.objects.all()

    return [
        _extract_product_preview(product_weight_instance)
        for product_weight_instance in product_weight_instances
    ]


def _extract_product_preview(product_weight_instance: ProductWeight) -> dict:
    product_copy = db_interface.tools.to_dict(product_weight_instance.product, PRODUCT_FIELDS)
    product_weight_copy = db_interface.tools.to_dict(product_weight_instance, PRODUCT_WEIGHT_FIELDS)
    product_copy.update(product_weight_copy)
    product_copy['image'] = db_interface.tools.select_single(
        ProductImage, 'product__id', product_weight_instance.product_id, [('image', 'image')]
    )
    return product_copy


def preview_by_id(product_weight_id: int) -> dict:
    return _extract_product_preview(ProductWeight.objects.get(id=product_weight_id))


def preview_by_ids(product_weight_ids: List[int]) -> list:
    product_weight_instances = ProductWeight.objects.filter(
        id__in=product_weight_ids
    )
    return [
        _extract_product_preview(product_weight_instance)
        for product_weight_instance in product_weight_instances
    ]


def full_by_id(product_weight_id: int) -> dict:
    product_weight_instance = ProductWeight.objects.get(id=product_weight_id)
    product_instance = product_weight_instance.product
    product_copy = db_interface.tools.to_dict(product_instance, PRODUCT_FIELDS)
    product_copy['images'] = list(db_interface.tools.select(
        ProductImage,
        'product__id', product_instance.id,
        [('image', 'image')]
    ))
    product_copy['info'] = list(db_interface.tools.select(
        ProductInfo,
        'product__id', product_instance.id,
        [('name', 'name'), ('value', 'value')]
    ))
    product_weight_copy = db_interface.tools.to_dict(product_weight_instance, PRODUCT_WEIGHT_FIELDS)
    product_copy.update(product_weight_copy)

    return product_copy
