from django.contrib import admin

from .models import Data

class DataModelAdmin(admin.ModelAdmin):
    list_display = ("dataId","temp","humid","rain","timestamp")
admin.site.register(Data, DataModelAdmin)
