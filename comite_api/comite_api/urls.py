from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers
from comite_api.settings import DEBUG
from core import views

router = routers.DefaultRouter()
router.register("people", views.PersonViewSet)
router.register("families", views.FamilyViewSet)
router.register("donations", views.DonationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/admin/', admin.site.urls),
]

if DEBUG:
    urlpatterns += [
        path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/docs/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
    ]