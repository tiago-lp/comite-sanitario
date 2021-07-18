from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.response import Response
from core import models, serializers


class BaseViewSet(viewsets.ModelViewSet):
    def destroy(self, request, pk):
        try:
            instance = self.get_object()
            instance.deleted = True
            instance.save()
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


class PersonViewSet(BaseViewSet):
    queryset = models.Person.objects.filter(deleted=False)
    serializer_class = serializers.PersonSerializer


class FamilyViewSet(BaseViewSet):
    queryset = models.Family.objects.filter(deleted=False)
    serializer_class = serializers.FamilySerializer


class DonationViewSet(BaseViewSet):
    queryset = models.Donation.objects.filter(deleted=False)
    serializer_class = serializers.DonationSerializer
