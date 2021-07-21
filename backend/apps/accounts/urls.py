from django.contrib.auth import views as auth_views
from django.urls import path

from apps.accounts import views
from apps.accounts.forms import UserLoginForm

from .auth_views import (
    CookieTokenRefreshView,
    CookieTokenObtainPairView,
)

urlpatterns = [
    path(
        "login",
        auth_views.LoginView.as_view(authentication_form=UserLoginForm),
        name="login",
    ),
    path("logout", views.CustomLogoutView.as_view(), name="logout"),
    path("register", views.register, name="register"),
    path(
        "activate/<uidb64>/<token>/",
        views.ActivateAccount.as_view(),
        name="activate",
    ),
    path("profile", views.profile_view, name="profile"),
    # JWT authentication with HttpOnly cookies
    path(
        "auth/jwt/token/",
        CookieTokenObtainPairView.as_view(),
        name="jwt_token_obtain_pair",
    ),
    path(
        "auth/jwt/token/refresh/",
        CookieTokenRefreshView.as_view(),
        name="jwt_token_refresh",
    ),
]
