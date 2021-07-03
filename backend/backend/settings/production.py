# flake8: noqa

from .base import *

DEBUG = 0

# add django-storages to INSTALLED_APPS
INSTALLED_APPS += ("storages",)

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# media files
DEFAULT_FILE_STORAGE = "storages.backends.s3boto.S3BotoStorage"
AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
MEDIA_URL = f"http://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/"
AWS_PRIVATE_MEDIA_LOCATION = "media/private"
PRIVATE_FILE_STORAGE = "backend.storage_backends.PrivateMediaStorage"
