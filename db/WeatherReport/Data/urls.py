from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns=[
    path('firebase/', views.index),
    path('datadays/', views.datadays),
    path('predict/', views.weather_prediction),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)