# flake8: noqa

from .production import *

# Parse database configuration from $DATABASE_URL
import dj_database_url

DATABASES["default"] = dj_database_url.config()

## Static files
# https://stackoverflow.com/questions/11569144/proper-way-to-handle-static-files-and-templates-for-django-on-heroku

# when deploying to heroku, pull in env vars for AWS access
AWS_DEFAULT_ACL = None
AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
# STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
STATICFILES_STORAGE = "backend.storage_backends.StaticStorage"

# necessary to fix manage.py collectstatic command to only upload changed files instead of all files
AWS_PRELOAD_METADATA = True
S3_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
AWS_S3_CUSTOM_DOMAIN = f"{S3_BUCKET_NAME}.s3.amazonaws.com"
STATIC_URL = "/static/"
STATIC_ROOT = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/static/"
MEDIA_ROOT = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/media/"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": (
                "%(asctime)s [%(process)d] [%(levelname)s] "
                + "pathname=%(pathname)s lineno=%(lineno)s "
                + "funcname=%(funcName)s %(message)s"
            ),
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "simple": {"format": "%(levelname)s %(message)s"},
    },
    "handlers": {
        "null": {
            "level": "DEBUG",
            "class": "logging.NullHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "testlogger": {
            "handlers": ["console"],
            "level": "INFO",
        }
    },
}
