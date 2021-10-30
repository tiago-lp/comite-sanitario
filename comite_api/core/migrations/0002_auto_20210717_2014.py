# Generated by Django 3.2.5 on 2021-07-17 23:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Donations",
            new_name="Donation",
        ),
        migrations.RenameModel(
            old_name="Families",
            new_name="Family",
        ),
        migrations.RenameModel(
            old_name="People",
            new_name="Person",
        ),
        migrations.AlterModelOptions(
            name="family",
            options={"verbose_name_plural": "Families"},
        ),
        migrations.AlterModelOptions(
            name="person",
            options={"verbose_name_plural": "People"},
        ),
    ]
