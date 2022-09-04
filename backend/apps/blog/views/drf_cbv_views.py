from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from apps.blog.models import Post, PostLike
from apps.blog.permissions import PostPermissions
from apps.blog.serializers import PostSerializer


class PostViewSet(ModelViewSet):

    serializer_class = PostSerializer
    permission_classes = (PostPermissions,)

    def get_queryset(self):
        return Post.objects.with_like_info(user=self.request.user)

    @action(
        methods=["post"],
        detail=True,
        url_path="like",
        url_name="like",
    )
    def like(self, request, pk):
        """
        Like a post. Returns the post with like info.
        """
        try:
            post = self.get_object()
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.user not in post.likes.all():
            post_like_through_model = PostLike(post=post, liked_by=request.user)
            post_like_through_model.save()

        else:
            post.likes.remove(request.user)

        serializer = PostSerializer(post)
        return Response(serializer.data)
