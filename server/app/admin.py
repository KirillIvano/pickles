from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline
from app.models import *

# Register your models here.
admin.site.site_header = "Админ-панель Aglobell"


class ProductInfoInline(StackedInline):
    model = ProductInfo


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    inlines = [ProductInfoInline]

