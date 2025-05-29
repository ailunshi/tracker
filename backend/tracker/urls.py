from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from django.urls import path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path("accounts/", include("accounts.urls")),
    path("writingsession/", include("writingsession.urls")),
]
