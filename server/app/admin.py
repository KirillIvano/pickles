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


class ProductWeightInline(TabularInline):
    model = ProductWeight


class ProductImageInline(StackedInline):
    model = ProductImage


class ItemInline(TabularInline):
    model = Item


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = [
        'name',
        'category',
    ]
    list_display_links = ['name']
    fields = [
        'category',
        'name',
        'name_translit',
    ]
    readonly_fields = ['name_translit']
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


@admin.register(OrderStatus)
class OrderStatusAdmin(ModelAdmin):
    pass

# @admin.register(OrderStatus)
# class OrderStatusAdmin(ModelAdmin):
#     pass