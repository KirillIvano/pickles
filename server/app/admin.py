from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline, TabularInline
from app.models import *


admin.site.site_header = "Админ-панель Aglobell"


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    fields = ['name', 'name_translit', 'description']
    readonly_fields = ['name_translit']


class ProductInfoInline(StackedInline):
    model = ProductInfo


class ProductWeightInline(TabularInline):
    model = ProductWeight
    fields = [
        'weight',
        'old_price',
        'price',
        'retail',
        'show'
    ]


class ProductImageInline(StackedInline):
    model = ProductImage


class ItemInline(TabularInline):
    model = Item


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = [
        'id',
        'name',
        'category',
    ]
    list_editable = [
        'category',
    ]
    list_display_links = ['name']
    fields = [
        'category',
        'name',
        'name_translit',
    ]
    readonly_fields = ['name_translit']
    search_fields = ['name']
    inlines = [ProductWeightInline, ProductInfoInline, ProductImageInline]


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    fields = [
        'hash',
        'name',
        'phone',
        'email',
        'address',
        'comment',
        'status',
        'datetime'
    ]
    readonly_fields = ['hash', 'datetime']
    inlines = [ItemInline]


@admin.register(DailyProductWeight)
class DailyProductWeightAdmin(ModelAdmin):
    fields = [
        'date',
        'wholesale_product',
    ]
    filter_horizontal = [
        'retail_product',
        'wholesale_product',
    ]


@admin.register(OrderStatus)
class OrderStatusAdmin(ModelAdmin):
    pass


@admin.register(ProductWeight)
class ProductWeightAdmin(ModelAdmin):
    list_display = [
        'id',
        'product_name',
        'weight',
        'price',
        'retail',
    ]

    def product_name(self, obj):
        return obj.product.name
    product_name.admin_order_field = 'product__name'

    list_editable = [
        'price',
    ]
    list_filter = [
        'retail',
    ]
