from typing import List, Dict
from datetime import datetime

import db_interface.tools
from app.models import Product, DailyProductWeight, ProductImage, ProductInfo, ProductWeight

PRODUCT_FIELDS = [
    ('id', 'id'),
    ('name', 'name'),
    ('name_translit', 'verboseName'),
    ('category_id', 'categoryId'),
]
PRODUCT_WEIGHT_FIELDS = [
    ('id', 'id'),
    ('retail', 'retail'),
    ('weight', 'weight'),
    ('old_price', 'oldPrice'),
    ('price', 'price'),
]


def _extract_product_previews(
        product_weight_instances: List[ProductWeight]
):
    for product_weight_instance in product_weight_instances:
        product_copy = db_interface.tools.to_dict(
            product_weight_instance.product, PRODUCT_FIELDS)
        product_copy['productId'] = product_weight_instance.product.id
        product_copy['image'] = db_interface.tools.select_single(
            ProductImage, 'product__id', product_weight_instance.product_id,
            [('image', 'image')]
        )
        if product_copy['image']:
            product_weight_copy = db_interface.tools.to_dict(
                product_weight_instance, PRODUCT_WEIGHT_FIELDS)
            product_copy.update(product_weight_copy)
            yield product_copy


def preview_every(category_id: int = None, retail: bool = None) -> list:
    product_weight_list = []

    if category_id and retail is not None:
        for product in Product.objects.filter(category__id=category_id):
            product_weight_list.append(
                ProductWeight.objects.filter(
                    retail=retail,
                    product=product
                ).first()
            )

    elif category_id:
        for product in Product.objects.filter(category__id=category_id):
            product_weight_list.append(
                ProductWeight.objects.filter(product=product).first()
            )

    elif retail is not None:
        for product in Product.objects.all():
            product_weight_list.append(
                ProductWeight.objects.filter(
                    retail=retail,
                    product=product
                ).first()
            )

    else:
        for product in Product.objects.all():
            product_weight_list.append(
                ProductWeight.objects.filter(
                    product=product
                ).first()
            )

    product_weight_list = list(filter(lambda pw: pw is not None, product_weight_list))

    return list(_extract_product_previews(product_weight_list))


def preview_by_ids(product_weight_ids: List[int]) -> list:
    product_weight_instances = ProductWeight.objects.filter(
        id__in=product_weight_ids
    )
    # pwplus = ProductWeight.objects.filter(
    #     id__in=product_weight_ids
    # ).select_related('product').prefetch_related('product__productinfo_set')
    # print(
    #     dir(pwplus[0].product.productimage_set),
    #     pwplus[0].product.productimage_set.get()
    # )
    # todo: optimize queries
    return list(_extract_product_previews(product_weight_instances))


def full_by_id(product_weight_id: int) -> dict:
    product_weight_instance = ProductWeight.objects.get(id=product_weight_id)
    related_product_weight_instances = ProductWeight.objects.filter(
        product=product_weight_instance.product,
        retail=product_weight_instance.retail
    ).order_by('price')
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
    related_product_weight_dicts = []
    for product_weight in related_product_weight_instances:
        product_weight_dict = db_interface.tools.to_dict(
            product_weight,
            PRODUCT_WEIGHT_FIELDS
        )
        product_weight_dict['productId'] = product_instance.id
        related_product_weight_dicts.append(product_weight_dict)

    product_copy['productWeights'] = related_product_weight_dicts

    return product_copy


def get_daily_wholesale() -> [dict, None]:
    try:
        pw = DailyProductWeight.objects.get(
            date=datetime.now().date()
        ).wholesale_product.first()
        pp = list(_extract_product_previews([pw]))
        return pp[0] if len(pp) > 0 else None
    except DailyProductWeight.DoesNotExist:
        return None
