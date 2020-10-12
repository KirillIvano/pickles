# Generated by Django 3.0.8 on 2020-08-12 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20200812_1108'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='items',
            options={'verbose_name': 'Позиция', 'verbose_name_plural': 'Позиции'},
        ),
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.CharField(max_length=512, verbose_name='Адрес'),
        ),
        migrations.AlterField(
            model_name='order',
            name='comment',
            field=models.CharField(max_length=512, verbose_name='Комментарий'),
        ),
    ]