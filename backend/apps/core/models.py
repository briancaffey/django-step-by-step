from django.conf import settings
from django.db import models

# Create your models here.


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
