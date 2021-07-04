from django.conf import settings
from django.core.files.storage import FileSystemStorage
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = settings.AWS_STATIC_LOCATION


if settings.DEBUG:

    class PrivateMediaStorage(FileSystemStorage):
        location = settings.AWS_PRIVATE_MEDIA_LOCATION


else:

    class PrivateMediaStorage(S3Boto3Storage):
        location = settings.AWS_PRIVATE_MEDIA_LOCATION
        default_acl = "private"
        file_overwrite = False
        custom_domain = False
