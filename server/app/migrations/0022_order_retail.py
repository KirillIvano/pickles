# Generated by Django 3.0.8 on 2020-10-21 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_auto_20201012_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='retail',
            field=models.BooleanField(default=False, verbose_name='Розница'),
            preserve_default=False,
        ),
    ]
