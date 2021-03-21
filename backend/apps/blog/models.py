from apps.core.models import BaseModel
from django.db import models


class Post(BaseModel):
    body = models.CharField(max_length=200)
    modified_by = None
