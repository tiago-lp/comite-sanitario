# Generated by Django 3.2.5 on 2021-07-17 22:50

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Donations",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "type",
                    models.IntegerField(
                        choices=[(1, "Dinheiro"), (2, "Alimento"), (3, "Outros")], default=1
                    ),
                ),
                (
                    "destined_to",
                    models.IntegerField(
                        choices=[(1, "Familia"), (2, "Pessoa"), (3, "Organizacao")], default=1
                    ),
                ),
                ("description", models.TextField()),
                ("received", models.BooleanField(default=False)),
                ("value", models.FloatField(default=0.0)),
                ("name", models.CharField(max_length=120)),
                ("deleted", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Families",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                ("name", models.CharField(max_length=120)),
                ("income", models.FloatField(default=0.0)),
                ("deleted", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="People",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                ("name", models.CharField(max_length=120)),
                ("age", models.IntegerField()),
                ("address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=120)),
                ("state", models.CharField(max_length=120)),
                ("geolocation", models.CharField(max_length=255)),
                ("cpf", models.CharField(max_length=20)),
                ("phone", models.CharField(max_length=40)),
                ("ocupation", models.CharField(max_length=120)),
                ("income", models.FloatField(default=0.0)),
                ("deleted", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "family",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.families"
                    ),
                ),
            ],
        ),
    ]
