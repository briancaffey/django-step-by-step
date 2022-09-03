# defines settings for applications using the DockerEc2 construct
from .base import *  # noqa

DEBUG = False

AWS_DEFAULT_ACL = None
STATICFILES_STORAGE = "backend.storage_backends.StaticStorage"

AWS_STATIC_LOCATION = "static"

AWS_PRIVATE_MEDIA_LOCATION = "media/private"
PRIVATE_FILE_STORAGE = "backend.storage_backends.PrivateMediaStorage"

AWS_PRELOAD_METADATA = True
AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]  # noqa
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
STATIC_ROOT = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/"
MEDIA_ROOT = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/"
