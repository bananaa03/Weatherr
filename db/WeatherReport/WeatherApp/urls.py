from django.urls import path
from WeatherApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    #database
    path('data/', views.dataApi),
    path('data/<int:id>/', views.dataApi),
    # user
    path('register/', views.UserRegisterView.as_view(), name="register-page"),
    path('login/', views.MyTokenObtainPairView.as_view(), name="login-page"),
    path('user/<int:pk>/', views.UserAccountDetailsView.as_view(), name="user-details"),
    path('user_update/<int:pk>/', views.UserAccountUpdateView.as_view(), name="user-update"),
    path('user_delete/<int:pk>/', views.UserAccountDeleteView.as_view(), name="user-delete"),
    #data
    path('data/', views.DataListView.as_view(), name="Data-list-page"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)