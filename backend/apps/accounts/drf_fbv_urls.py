from django.urls import path

from apps.accounts.drf_fbv_views import get_user, get_users

urlpatterns = [
    path("users/<int:pk>/", get_user, name="drf-fbv-get-user"),
    path("users/", get_users, name="drf-fbv-get-users"),
]
