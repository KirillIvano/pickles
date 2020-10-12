from django.urls import path
from django.http import HttpResponse
from app.views import product, category, order
from services import mail


urlpatterns = [
    path('productPreview', product.preview_every),
    path('product/<int:product_weight_id>', product.full_by_id),

    path('category/all', category.every),
    path('category/<int:category_id>', category.by_id),

    path('order', order.new),
    path('order/<int:order_id>', order.get)
]