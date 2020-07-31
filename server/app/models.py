from django.db.models import *
from helpers import download_image
from helpers import random_hash
# Create your models here.


class Category(Model):
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

    id = AutoField(primary_key=True)
    name = CharField(
        verbose_name='Название',
        max_length=256
    )
    order = IntegerField(
        verbose_name='Порядок',
        default=0
    )


class Product(Model):
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return f'{self.name} | {self.category.name}'

    id = AutoField(primary_key=True)
    name = CharField(
        verbose_name='Название',
        max_length=256
    )
    price = IntegerField(
        verbose_name='Цена'
    )
    weight = IntegerField(
        verbose_name='Вес (в граммах)'
    )
    category = ForeignKey(
        verbose_name='Категория',
        to=Category, on_delete=SET_NULL, null=True
    )


class ProductImage(Model):
    product = ForeignKey(
        verbose_name='Продукт',
        to=Product, on_delete=CASCADE
    )
    image_url = CharField(
        max_length=512,
        verbose_name='Ссылка на фото',
        null=True, blank=True
    )
    image = ImageField(
        verbose_name='Файл с фото',
        null=True, blank=True,
        upload_to=random_hash.hash_filename,
    )

    def save(self, *a, **kw):
        if self.image_url:
            self.image = download_image.save_photo(self.image_url)
        self.image_url = None
        super().save(*a, **kw)


class ProductInfo(Model):
    class Meta:
        verbose_name = 'Информация о продукте'
        verbose_name_plural = 'Информация о продукте'

    def __str__(self):
        return f'{self.product.name} {self.name}'

    product = ForeignKey(
        verbose_name='Продукт',
        to=Product,
        on_delete=CASCADE
    )
    name = CharField(
        verbose_name='Название',
        max_length=128
    )
    text = TextField(
        verbose_name='Текст'
    )