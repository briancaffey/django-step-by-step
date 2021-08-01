from django.contrib.auth import views as auth_views
from django.urls import path

from apps.accounts import views
from apps.accounts.forms import UserLoginForm

from .auth_views import (
    CookieTokenRefreshView,
    CookieTokenObtainPairView,
    logout,
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
        "api/auth/jwt/token/",
        CookieTokenObtainPairView.as_view(),
        name="jwt_token_obtain_pair",
    ),
    path(
        "api/auth/jwt/token/refresh/",
        CookieTokenRefreshView.as_view(),
        name="jwt_token_refresh",
    ),
    path(
        "api/auth/jwt/token/logout/",
        logout,
        name="jwt_token_logout",
    ),
]
