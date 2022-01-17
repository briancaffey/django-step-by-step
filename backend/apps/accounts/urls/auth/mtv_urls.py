from django.contrib.auth import views as auth_views
from django.urls import path

from apps.accounts.views import mtv_auth_views
from apps.accounts.forms import UserLoginForm

urlpatterns = [
    path(
        "login",
        auth_views.LoginView.as_view(authentication_form=UserLoginForm),
        name="login",
    ),
    path("logout", mtv_auth_views.CustomLogoutView.as_view(), name="logout"),
    path("register", mtv_auth_views.register, name="register"),
    path(
        "activate/<uidb64>/<token>/",
        mtv_auth_views.ActivateAccount.as_view(),
        name="activate",
    ),
    path("profile", mtv_auth_views.profile_view, name="profile"),
]
