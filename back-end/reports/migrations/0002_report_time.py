# Generated by Django 2.2.16 on 2020-11-09 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]