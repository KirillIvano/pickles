# Generated by Django 3.0.8 on 2020-08-20 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_item_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='hash_digital',
        ),
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
