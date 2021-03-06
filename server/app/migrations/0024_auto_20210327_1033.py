# Generated by Django 3.1.7 on 2021-03-27 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_dailyproductweight'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dailyproductweight',
            options={'verbose_name': 'Продукт дня', 'verbose_name_plural': 'Продукты дня'},
        ),
        migrations.AlterField(
            model_name='dailyproductweight',
            name='date',
            field=models.DateField(verbose_name='Дата'),
        ),
        migrations.RemoveField(
            model_name='dailyproductweight',
            name='retail_product',
        ),
        migrations.AddField(
            model_name='dailyproductweight',
            name='retail_product',
            field=models.ManyToManyField(blank=True, null=True, related_name='retail_product', to='app.ProductWeight', verbose_name='Розничный продукт'),
        ),
        migrations.RemoveField(
            model_name='dailyproductweight',
            name='wholesale_product',
        ),
        migrations.AddField(
            model_name='dailyproductweight',
            name='wholesale_product',
            field=models.ManyToManyField(blank=True, null=True, related_name='wholesale_product', to='app.ProductWeight', verbose_name='Отповый продукт'),
        ),
    ]
