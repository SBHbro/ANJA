# Generated by Django 2.2.16 on 2020-11-09 05:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201109_1325'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='pw',
            new_name='password',
        ),
    ]
