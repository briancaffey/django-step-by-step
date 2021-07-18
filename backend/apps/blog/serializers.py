from rest_framework import serializers

from apps.blog.models import Post

from apps.accounts.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    liked = serializers.BooleanField(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    created_by = CustomUserSerializer(read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        try:
            image = self.context["request"].build_absolute_uri(obj.image.url)
        except ValueError:
            image = None
        return image

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
