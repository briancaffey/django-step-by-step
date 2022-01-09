from django.urls import path

from apps.accounts.views.drf_fbv_views import (
    get_user,
    get_users,
    get_profile,
    register,
    verify_email,
)

urlpatterns = [
    path(
        "activate/<uidb64>/<token>/",
        verify_email,
        name="drf-fbv-activate",
    ),
    path("register/", register, name="drf-fbv-register"),
    path("users/<int:pk>/", get_user, name="drf-fbv-get-user"),
    path("users/", get_users, name="drf-fbv-get-users"),
    # user profile
    path("profile/", get_profile, name="drf-fbv-get-profile"),
]
