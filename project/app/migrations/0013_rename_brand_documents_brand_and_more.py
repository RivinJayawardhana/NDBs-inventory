# Generated by Django 5.1 on 2024-11-18 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_rename_user_trash_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='documents',
            old_name='Brand',
            new_name='brand',
        ),
        migrations.RenameField(
            model_name='documents',
            old_name='Date',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='documents',
            old_name='Doctype',
            new_name='doctype',
        ),
        migrations.RenameField(
            model_name='documents',
            old_name='Quantity',
            new_name='quantity',
        ),
        migrations.RenameField(
            model_name='documents',
            old_name='Remark',
            new_name='remark',
        ),
        migrations.RenameField(
            model_name='documents',
            old_name='SerialNo',
            new_name='serial_no',
        ),
        migrations.AddField(
            model_name='documents',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
