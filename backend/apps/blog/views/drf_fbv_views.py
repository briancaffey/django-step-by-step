from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.blog.models import Post, PostLike
from apps.blog.serializers import PostSerializer


@api_view(["GET"])
def get_post(request, pk):
    """
    Retrieve a single post
    """
    try:
        post = Post.objects.with_like_info(user=request.user).get(id=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PostSerializer(post, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def list_posts(request):
    """
    Retrieve a paginated list of posts with like info
    """
    paginator = LimitOffsetPagination()
    posts = Post.objects.with_like_info(user=request.user).all()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True, context={"request": request})
    return_data = paginator.get_paginated_response(serializer.data)
    return return_data


@api_view(["POST"])
def create_post(request):
    """
    Create a single post
    """
    print("OK - create post")
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        if request.user.is_authenticated:
            serializer.validated_data["created_by"] = request.user
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_post(request, pk):
    """
    Update a post
    """
    try:
        post = Post.objects.with_like_info(user=request.user).get(id=pk)
        if post.created_by != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(post, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    """
    Delete a post
    """
    post = get_object_or_404(Post, id=pk)
    if post.created_by == request.user:
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_post(request, pk):
    """
    Like a post. Returns the post with like info.
    """
    try:
        post = Post.objects.with_like_info(user=request.user).get(id=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user not in post.likes.all():
        post_like_through_model = PostLike(post=post, liked_by=request.user)
        post_like_through_model.save()

    else:
        post.likes.remove(request.user)

    post = Post.objects.with_like_info(user=request.user).get(id=pk)

    serializer = PostSerializer(post)
    return Response(serializer.data)
