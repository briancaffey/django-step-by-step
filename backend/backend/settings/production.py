# flake8: noqa

from .base import *

DEBUG = 0

# add django-storages to INSTALLED_APPS
INSTALLED_APPS += ("storages",)

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# static and media files
AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
MEDIA_URL = "/media/"
AWS_PRIVATE_MEDIA_LOCATION = "media/private"
PRIVATE_FILE_STORAGE = "backend.storage_backends.PrivateMediaStorage"
AWS_STATIC_LOCATION = "static"
