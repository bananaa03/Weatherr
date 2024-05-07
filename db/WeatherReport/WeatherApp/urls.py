from django.urls import path
from WeatherApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    path('data/', views.dataApi),
    path('data/<int:id>/', views.dataApi),

    # path('user/', views.dataApi),
    # path('user/<int:id>/', views.userApi),

    path('saveFile/', views.SaveFile)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)