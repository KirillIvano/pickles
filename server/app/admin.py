from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline
from app.models import *

# Register your models here.
admin.site.site_header = "Админ-панель Aglobell"


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    pass


class ProductInfoInline(StackedInline):
    model = ProductInfo


class ProductImageInline(StackedInline):
    model = ProductImage


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    inlines = [ProductInfoInline, ProductImageInline]

