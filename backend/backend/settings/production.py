# flake8: noqa

from .base import *

from apps.core.utils import database_secret

DEBUG = 0

DATABASES["default"]["OPTIONS"] = {
    "sslmode": "verify-full",
    "sslrootcert": "/usr/local/share/global-bundle.pem",
}

DATABASES["default"]["PASSWORD"] = database_secret

# add django-storages to INSTALLED_APPS
INSTALLED_APPS += ("storages",)

STATICFILES_STORAGE = "backend.storage_backends.StaticStorage"
# static and media files
AWS_DEFAULT_ACL = None
AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
STATIC_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/"
MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/"
AWS_PRIVATE_MEDIA_LOCATION = "media/private"
AWS_STATIC_LOCATION = "static"

## Django CORS settings
# If True, cookies will be allowed to be included in cross-site HTTP requests. Defaults to False.
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOWED_ORIGINS = [FRONTEND_URL]
CSRF_TRUSTED_ORIGINS = [FRONTEND_URL]

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
