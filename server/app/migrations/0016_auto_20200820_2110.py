# Generated by Django 3.0.8 on 2020-08-20 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_auto_20200820_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='datetime',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='Дата и время создания'),
        ),
    ]
