from django.urls import path

from apps.accounts.drf_fbv_views import get_user

urlpatterns = [path("users/<int:pk>/", get_user, name="drf-fbv-get-user")]
