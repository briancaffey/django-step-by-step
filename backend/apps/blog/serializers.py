from rest_framework import serializers

from apps.blog.models import Post

from apps.accounts.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    liked = serializers.BooleanField(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "body",
            "created_by",
            "modified_on",
            "liked",
            "like_count",
            "image",
        )
