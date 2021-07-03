# flake8: noqa

from .base import *
from apps.core.utils import from_secret

DEBUG = 0

# add django-storages to INSTALLED_APPS
INSTALLED_APPS += ("storages",)

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

# media files
DEFAULT_FILE_STORAGE = "storages.backends.s3boto.S3BotoStorage"
AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
MEDIA_URL = f"http://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
AWS_PRIVATE_MEDIA_LOCATION = "media/private"
PRIVATE_FILE_STORAGE = "backend.storage_backends.PrivateMediaStorage"
