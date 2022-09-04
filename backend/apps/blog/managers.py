from django.apps import apps
from django.db import models
from django.db.models import Count, Exists, OuterRef


class PostQuerySet(models.QuerySet):
    def with_like_counts(self):
        return self.prefetch_related("created_by").annotate(like_count=Count("likes"))

    def with_liked(self, user=None):
        PostLike = apps.get_model("blog", "PostLike")
        if user is not None:
            return self.annotate(
                liked=Exists(
                    PostLike.objects.filter(
                        liked_by_id=user.id or None,
                        post=OuterRef("id"),
                    )
                ),
            )


class PostManager(models.Manager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_queryset(self):
        queryset = PostQuerySet(model=self.model, using=self._db, hints=self._hints)
        return queryset

    def with_like_counts(self):
        return self.get_queryset().with_like_counts()

    def with_like_info(self, user):
        return self.with_like_counts().with_liked(user).order_by("-modified_on")
