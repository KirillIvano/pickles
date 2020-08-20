from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline, TabularInline
from app.models import *


admin.site.site_header = "Админ-панель Aglobell"


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    fields = ['name', 'name_translit']
    readonly_fields = ['name_translit']


class ProductInfoInline(StackedInline):
    model = ProductInfo


class ProductImageInline(StackedInline):
    model = ProductImage


class ItemInline(TabularInline):
    model = Item


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    fields = [
        'category',
        'name',
        'name_translit',
        'price',
        'weight',
    ]
    readonly_fields = ['name_translit']
    inlines = [ProductInfoInline, ProductImageInline]


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    fields = [
        'hash',
        'hash_digital',
        'name',
        'phone',
        'email',
        'address',
        'comment',
        'status',
    ]
    readonly_fields = ['hash', 'hash_digital']
    inlines = [ItemInline]

# @admin.register(OrderStatus)
# class OrderStatusAdmin(ModelAdmin):
#     pass

# @admin.register(OrderStatus)
# class OrderStatusAdmin(ModelAdmin):
#     pass