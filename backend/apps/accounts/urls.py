from django.contrib.auth import views as auth_views
from django.urls import path

from apps.accounts import views
from apps.accounts.forms import UserLoginForm

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
]
