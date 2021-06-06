# flake8: noqa

from .base import *
from apps.core.utils import from_secret

DEBUG = 0

STATIC_ROOT = "staticfiles/"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_NAME", "postgres"),
        "USER": os.environ.get("POSTGRES_USERNAME", "postgres"),
        # TODO: rename this function
        "PASSWORD": from_secret(),
        "HOST": os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_SERVICE_PORT", 5432),
    }
}
