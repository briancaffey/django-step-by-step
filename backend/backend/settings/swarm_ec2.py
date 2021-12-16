# defines settings for applications using the DockerEc2 construct
from .base import *

DEBUG = False

# when deploying to heroku, pull in env vars for AWS access
AWS_DEFAULT_ACL = None
STATICFILES_STORAGE = "backend.storage_backends.StaticStorage"

# necessary to fix manage.py collectstatic command to only upload changed files instead of all files
AWS_STATIC_LOCATION = "static"

AWS_PRIVATE_MEDIA_LOCATION = "media/private"
PRIVATE_FILE_STORAGE = "backend.storage_backends.PrivateMediaStorage"

AWS_PRELOAD_METADATA = True
S3_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
AWS_S3_CUSTOM_DOMAIN = f"{S3_BUCKET_NAME}.s3.amazonaws.com"
STATIC_ROOT = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/static/"
MEDIA_ROOT = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/media/"
