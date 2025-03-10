from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='tracker-home'),
    #enables login/logout in the browsable API
    path('api-auth/', include('rest_framework.urls')),
]
