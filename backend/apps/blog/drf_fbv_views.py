from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from apps.blog.models import Post
from apps.blog.serializers import PostSerializer


@api_view(["GET"])
def get_post(request, pk):
    """
    Retrieve a single post
    """
    # TODO: add like info using manager
    post = get_object_or_404(Post, id=pk)
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(["GET"])
def list_posts(request):
    """
    Retrieve a paginated list of posts
    """
    paginator = LimitOffsetPagination()
    posts = Post.objects.all()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)
    return_data = paginator.get_paginated_response(serializer.data)
    return return_data


@api_view(["POST"])
def create_post(request):
    """
    Create a single post
    """
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_post(request, pk):
    """
    Update a post
    """
    post = get_object_or_404(Post, id=pk)

    serializer = PostSerializer(post, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_post(request, pk):
    """
    Delete a post
    """

    post = get_object_or_404(Post, id=pk)

    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
