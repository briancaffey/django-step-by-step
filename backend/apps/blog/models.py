from apps.core.models import BaseModel
from django.db import models


class Post(BaseModel):

    # meta class
    class Meta:
        ordering = ("-modified_on",)

    body = models.CharField(max_length=200)
    modified_by = None

    def __str__(self):
        return self.body
