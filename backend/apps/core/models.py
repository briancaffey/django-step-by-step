from django.conf import settings
from django.db import models


class BaseModel(models.Model):

    created_on = models.DateTimeField(auto_now_add=True, editable=False)
    modified_on = models.DateTimeField(auto_now=True, editable=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        default=None,
        blank=True,
        editable=False,
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_created_by",
    )
    modified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        default=None,
        blank=True,
        editable=False,
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_modified_by",
    )

    class Meta:
        abstract = True


class RequestLog(models.Model):
    """
    Request Log
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL,
        blank=True,
    )
    date = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=3000)
    full_path = models.CharField(max_length=3000)
    execution_time = models.IntegerField(null=True)
    response_code = models.PositiveIntegerField()
    method = models.CharField(max_length=10, null=True)
    remote_address = models.CharField(max_length=20, null=True)
