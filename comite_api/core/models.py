import uuid
from django.db import models


DESTINATION_CHOICES = (
    (1, "Familia"),
    (2, "Pessoa"),
    (3, "Organizacao"),
)

TYPE_CHOICES = (
    (1, "Dinheiro"),
    (2, "Alimento"),
    (3, "Outros"),
)


# Create your models here.
class Family(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120, null=False)
    income = models.FloatField(default=0.0)
    deleted = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Families"


class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120)
    age = models.IntegerField()
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120)
    geolocation = models.CharField(max_length=255)
    cpf = models.CharField(max_length=20)
    phone = models.CharField(max_length=40)
    ocupation = models.CharField(max_length=120)
    income = models.FloatField(default=0.0)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "People"

class Donation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.IntegerField(choices=TYPE_CHOICES, null=False, default=1)
    destined_to = models.IntegerField(choices=DESTINATION_CHOICES, null=False, default=1)
    description = models.TextField()
    received = models.BooleanField(default=False, null=False)
    value = models.FloatField(default=0.0)
    name = models.CharField(max_length=120)
    deleted = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
