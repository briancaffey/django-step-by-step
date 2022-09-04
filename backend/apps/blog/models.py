from apps.core.models import BaseModel
from django.db import models
from django.contrib.auth import get_user_model

from apps.blog.managers import PostManager
from backend.storage_backends import PrivateMediaStorage


User = get_user_model()


class Post(BaseModel):

    objects = PostManager()

    class Meta:
        ordering = ("-modified_on",)

    body = models.CharField(max_length=200)
    image = models.ImageField(
        blank=True, upload_to="images", storage=PrivateMediaStorage()
    )
    modified_by = None
    likes = models.ManyToManyField(User, through="PostLike")

    def __str__(self):  # pragma: no cover
        return self.body


class PostLike(models.Model):
    """
    Through model for `likes` m2m field on Post model
    """

    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    liked_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["liked_by", "post"]
