from django.http import HttpResponse


def index(request):
    return HttpResponse("Início do comite_admin :)")