# flake8: noqa

from .base import *

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += [
    "debug_toolbar",
    "django_extensions",
]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_COLLAPSED": True,
}

MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]

INTERNAL_IPS = ["127.0.0.1"]

ADMIN_EMAIL = "user@email.com"
