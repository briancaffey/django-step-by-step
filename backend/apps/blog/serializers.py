from rest_framework import serializers

from apps.blog.models import Post  # , PostLike


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("body", "id", "created_by", "modified_on")
