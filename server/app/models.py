from django.db.models import *
from helpers import download_image
from helpers import random_hash
from helpers.transliterate import translit
from services.mail.interface import *


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
    description = TextField(
        verbose_name="Описание",
        null=True, blank=True
    )
    description_meta = TextField(
        verbose_name="Описание для meta description",
        null=True, blank=True
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
        return f'{self.name}'

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
    category = ForeignKey(
        verbose_name='Категория',
        to=Category, on_delete=SET_NULL, null=True
    )


class ProductWeight(Model):
    class Meta:
        verbose_name = 'Вес продукта'
        verbose_name_plural = 'Вес продуктов'

    def __str__(self):
        return f'{self.product.name} {self.weight}'

    id = AutoField(primary_key=True)
    product = ForeignKey(
        Product,
        on_delete=CASCADE
    )
    retail = BooleanField(
        verbose_name='Розница',
        default=False
    )
    weight = CharField(
        verbose_name='Вес (объём)',
        max_length=64
    )
    old_price = IntegerField(
        verbose_name='Старая цена (для скидок)',
        null=True, blank=True
    )
    price = IntegerField(
        verbose_name='Цена'
    )
    show = BooleanField(
        verbose_name='Показывать',
        default=True
    )
    #
    # @property
    # def name(self):
    #     return self.product.name


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


class DailyProductWeight(Model):
    class Meta:
        verbose_name = "Продукт дня"
        verbose_name_plural = "Продукты дня"

    def __str__(self):
        return f"{self.date}"

    date = DateField(verbose_name='Дата')
    retail_product = ManyToManyField(
        "ProductWeight",
        related_name='retail_product',
        verbose_name='Розничный продукт',
    )
    wholesale_product = ManyToManyField(
        "ProductWeight",
        related_name='wholesale_product',
        verbose_name='Отповый продукт',
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
        return f"{self.name} {self.phone} {self.datetime.date()}"

    def save(self, *args, **kwargs):
        if self.pk is None:
            orig = None
        else:
            orig = Order.objects.get(id=self.id)

        super().save(*args, **kwargs)
        handle_order_mailing(Order.objects.get(id=self.id), orig)

    id = AutoField(primary_key=True)
    hash = CharField(
        default=random_hash.hash_string,
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
        auto_now=True,
        null=True
    )
    status = ForeignKey(
        OrderStatus,
        verbose_name='Статус',
        on_delete=SET_NULL,
        null=True,
    )
    retail = BooleanField(
        verbose_name='Розница'
    )


class Item(Model):
    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позиции'

    def __str__(self):
        return f"{self.product_weight.product.name} {self.quantity}"

    product_weight = ForeignKey(
        ProductWeight,
        verbose_name='Продукт',
        on_delete=DO_NOTHING,
    )
    order = ForeignKey(
        Order,
        on_delete=CASCADE
    )
    quantity = IntegerField(
        verbose_name='Количество'
    )
    price = IntegerField(
        verbose_name='Цена',
    )
