# Generated by Django 3.0.8 on 2020-09-11 16:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_auto_20200911_1625'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productweight',
            old_name='product_id',
            new_name='product',
        ),
    ]
