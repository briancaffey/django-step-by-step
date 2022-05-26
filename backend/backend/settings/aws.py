# flake8: noqa

from .production import *

from apps.core.utils import from_secret

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

## Email settings

EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "user@email.com")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "password")
EMAIL_PORT = os.environ.get("EMAIL_PORT", "587")
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
ADMINS = [("Admin", os.environ.get("ADMINS", ""))]

SESSION_COOKIE_DOMAIN = os.environ.get("DOMAIN_NAME", "domain.com")
