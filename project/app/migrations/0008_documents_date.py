# Generated by Django 5.1 on 2024-09-12 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_documents_delete_trash'),
    ]

    operations = [
        migrations.AddField(
            model_name='documents',
            name='Date',
            field=models.CharField(default='none', max_length=20),
        ),
    ]