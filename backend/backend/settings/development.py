# flake8: noqa

from .base import *

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += ["debug_toolbar", "django_extensions", "silk"]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_COLLAPSED": True,
}

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
]

INTERNAL_IPS = ["127.0.0.1"]

ADMIN_EMAIL = "user@email.com"

NOTEBOOK_ARGUMENTS = [
    "--ip",
    "0.0.0.0",
    "--allow-root",
    "--no-browser",
]

# PRIVATE_MEDIA_STORAGE = "backend.storage_backends"
DEFAULT_FILE_STORAGE = "backend.storage_backends.PrivateVolumeMediaStorage"
