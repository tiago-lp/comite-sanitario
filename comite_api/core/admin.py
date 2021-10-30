from django.contrib import admin

from core.models import Family, Person, Donation

# Register your models here.
admin.site.register(Family)
admin.site.register(Person)
admin.site.register(Donation)
