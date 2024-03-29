# Generated by Django 3.2.5 on 2021-07-25 15:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_auto_20210717_2014"),
    ]

    operations = [
        migrations.AlterField(
            model_name="donation",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name="person",
            name="address",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="person",
            name="age",
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name="person",
            name="city",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AlterField(
            model_name="person",
            name="cpf",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name="person",
            name="family",
            field=models.ForeignKey(
                blank=True, on_delete=django.db.models.deletion.CASCADE, to="core.family"
            ),
        ),
        migrations.AlterField(
            model_name="person",
            name="geolocation",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="person",
            name="ocupation",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AlterField(
            model_name="person",
            name="phone",
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AlterField(
            model_name="person",
            name="state",
            field=models.CharField(blank=True, max_length=120),
        ),
    ]
