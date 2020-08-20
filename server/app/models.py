from django.db.models import *
from helpers import download_image
from helpers import random_hash
from helpers.transliterate import translit
# Create your models here.


class Category(Model):
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

    def save(self, *a, **kw):
        self.name_translit = translit(self.name)
        super().save(*a, **kw)

    id = AutoField(primary_key=True)
    name = CharField(
        verbose_name='Название',
        max_length=256
    )
    name_translit = CharField(
        verbose_name='Название в ссылке',
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

    def save(self, *a, **kw):
        self.name_translit = translit(self.name)
        super().save(*a, **kw)

    id = AutoField(primary_key=True)
    name = CharField(
        verbose_name='Название',
        max_length=256
    )
    name_translit = CharField(
        verbose_name='Название в ссылке',
        max_length=256
    )
    price = IntegerField(
        verbose_name='Цена'
    )
    weight = CharField(
        verbose_name='Вес (объём)',
        max_length=64
    )
    category = ForeignKey(
        verbose_name='Категория',
        to=Category, on_delete=SET_NULL, null=True
    )


class ProductImage(Model):
    class Meta:
        verbose_name = 'Фото продукта'
        verbose_name_plural = 'Фото продукта'

    def __str__(self):
        return f'Фото #{self.id}'

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
    value = TextField(
        verbose_name='Текст'
    )


class OrderStatus(Model):

    class Meta:
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"

    def __str__(self):
        return self.verbose_name

    id = AutoField(primary_key=True)
    code = CharField(
        verbose_name='Код',
        max_length=128
    )
    verbose_name = CharField(
        verbose_name='Название',
        max_length=256
    )


class Order(Model):
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return f"{self.name} {self.phone}"

    hash = CharField(
        default=random_hash.hash_string,
        max_length=64
    )
    hash_digital = CharField(
        default=random_hash.hash_digital,
        max_length=64
    )
    name = CharField(
        verbose_name='Имя',
        max_length=64
    )
    phone = CharField(
        verbose_name='Телефон',
        max_length=64
    )
    email = CharField(
        verbose_name='Email',
        max_length=128,
    )
    address = CharField(
        verbose_name='Адрес',
        max_length=512,
    )
    comment = CharField(
        verbose_name='Комментарий',
        max_length=512,
    )
    datetime = DateTimeField(
        verbose_name='Дата и время создания',
        auto_created=True,
        null=True
    )

    status = ForeignKey(
        OrderStatus,
        verbose_name='Статус',
        on_delete=SET_NULL,
        null=True,
    )


class Item(Model):

    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позиции'

    def __str__(self):
        return f"{self.product.name} {self.quantity}"

    product = ForeignKey(
        Product,
        verbose_name='Продукт',
        on_delete=DO_NOTHING,
        )
    order = ForeignKey(
        Order,
        on_delete=CASCADE)
    quantity = IntegerField(
        verbose_name='Количество'
    )
    price = IntegerField(
        verbose_name='Цена',
    )

