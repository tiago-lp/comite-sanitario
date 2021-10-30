from rest_framework import serializers
from core import models


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = "__all__"


class FamilySerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField("get_members", read_only=True)

    def get_members(self, obj):
        people = models.Person.objects.filter(family=obj, deleted=False)
        return PersonSerializer(people, many=True).data

    class Meta:
        model = models.Family
        fields = "__all__"


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Donation
        fields = "__all__"
