from django import forms
from django.contrib.auth.forms import (
    AuthenticationForm,
    UserCreationForm,
    UserChangeForm,
)
from django.contrib.auth import get_user_model

from .models import CustomUser

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ("email",)


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ("email",)


class UserLoginForm(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ["username", "password"]

    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.EmailField(
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "email",
                "id": "email",
                "autofocus": True,
                "type": "email",
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "password",
                "id": "password",
            }
        )
    )


class CustomUserRegistrationForm(UserCreationForm):
    # username = forms.CharField(max_length=30)
    # email = forms.EmailField(max_length=200)
    email = forms.EmailField(
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "email",
                "id": "email",
            }
        )
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "password",
                "id": "password1",
            }
        )
    )

    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "repeat password",
                "id": "password2",
            }
        )
    )

    class Meta:
        model = User
        fields = (
            # "username",
            "email",
            "password1",
            "password2",
        )
