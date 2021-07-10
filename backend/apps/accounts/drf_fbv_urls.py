from django.urls import path

from apps.accounts.drf_fbv_views import get_user, get_users, get_profile

urlpatterns = [
    path("users/<int:pk>/", get_user, name="drf-fbv-get-user"),
    path("users/", get_users, name="drf-fbv-get-users"),
    # user profile
    path("profile/", get_profile, name="drf-fbv-get-profile"),
]
