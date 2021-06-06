# flake8: noqa

from .base import *


DEBUG = 0

STATIC_ROOT = "staticfiles/"

# Secrets manager Secret ID passed in as environment variable
# Use this to look up secret from Secret string
SECRET_ID = os.environ.get("SECRET_ID")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_NAME", "postgres"),
        "USER": os.environ.get("POSTGRES_USERNAME", "postgres"),
        "PASSWORD": from_secret(),
        "HOST": os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_SERVICE_PORT", 5432),
    }
}
