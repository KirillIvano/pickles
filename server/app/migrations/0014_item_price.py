# Generated by Django 3.0.8 on 2020-08-15 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_auto_20200814_1925'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='price',
            field=models.IntegerField(default=0, verbose_name='Цена'),
            preserve_default=False,
        ),
    ]
