from django.urls import path
from django.http import HttpResponse
from app.views import product, category, order
from services import mail


urlpatterns = [
    path('product/all', product.every),
    path('product/<int:product_id>', product.by_id),

    path('category/all', category.every),
    path('category/<int:category_id>', category.by_id),

    path('order', order.new)
]