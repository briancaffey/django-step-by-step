from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(
        _("email address"), unique=True, validators=[validate_email]
    )
    first_name = models.CharField(
        _("first name"), max_length=30, blank=True, null=True
    )
    last_name = models.CharField(
        _("last name"), max_length=30, blank=True, null=True
    )
    profile_setup_complete = models.BooleanField(
        _("profile setup complete"), default=False
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Check if both first_name and last_name are filled
        if self.first_name and self.last_name:
            self.profile_setup_complete = True
        else:
            self.profile_setup_complete = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
