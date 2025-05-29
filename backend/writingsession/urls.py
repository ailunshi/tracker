from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("start/", views.StartTrackerView.as_view(), name="start_tracker"),
    path("stop/", views.StopTrackerView.as_view(), name="stop_tracker"),
]
