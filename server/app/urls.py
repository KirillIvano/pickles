from django.urls import path
from django.http import HttpResponse
from app.views import product, category, order
from services import mail


urlpatterns = [
    path('productPreview', product.preview_every),
    # path('productPreview/retail', product.preview_every),
    # path('productPreview/wholesale', product.preview_every),
    path('productPreview/wholesale/daily', product.daily_wholesale),
    path('product/<int:product_weight_id>', product.full_by_id),

    path('category/all', category.every),
    path('category/<int:category_id>', category.by_id),

    path('order', order.new),
    path('order/<int:order_id>', order.get)
]
