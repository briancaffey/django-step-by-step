from django.urls import path

from apps.accounts.views.drf_auth_views import (
    CookieTokenRefreshView,
    CookieTokenObtainPairView,
    logout,
)

urlpatterns = [
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
    path(
        "auth/jwt/token/logout/",
        logout,
        name="jwt_token_logout",
    ),
]
