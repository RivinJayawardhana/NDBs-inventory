# Generated by Django 5.1 on 2024-11-12 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_trash'),
    ]

    operations = [
        migrations.AddField(
            model_name='trash',
            name='contactnumber',
            field=models.CharField(default='none', max_length=20),
        ),
    ]
