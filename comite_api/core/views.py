from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.response import Response
from core import models, serializers
from rest_framework.permissions import IsAuthenticated
# from django.http import HttpResponse
# from django.conf import settings
# import os
# from django.views.generic import View

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
    permission_classes = (IsAuthenticated,)

    queryset = models.Person.objects.filter(deleted=False)
    serializer_class = serializers.PersonSerializer


class FamilyViewSet(BaseViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = models.Family.objects.filter(deleted=False)
    serializer_class = serializers.FamilySerializer


class DonationViewSet(BaseViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = models.Donation.objects.filter(deleted=False)
    serializer_class = serializers.DonationSerializer

# class FrontendAppView(View):
#     """
#     Serves the compiled frontend entry point (only works if you have run `yarn
#     run build`).
#     """
#     def get(self, request):
#             print (os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
#             try:
#                 with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
#                     return HttpResponse(f.read())
#             except FileNotFoundError:
#                 return HttpResponse(
#                     """
#                     This URL is only used when you have built the production
#                     version of the app. Visit http://localhost:3000/ instead, or
#                     run `yarn run build` to test the production version.
#                     """,
#                     status=501,
#                 )