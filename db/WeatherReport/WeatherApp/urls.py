from django.urls import path
from WeatherApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    path('data/', views.dataApi),
    path('data/<int:id>/', views.dataApi),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)