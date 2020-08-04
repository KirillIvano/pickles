from django.urls import path
from app.views import product, category

urlpatterns = [
    path('product/all', product.every),
    path('product/<int:product_id>', product.by_id),

    path('category/all', category.every),
    path('category/<int:category_id>', category.by_id),
]