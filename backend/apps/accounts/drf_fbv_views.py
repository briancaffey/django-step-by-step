from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

from apps.accounts.serializers import CustomUserSerializer

User = get_user_model()


@api_view(["GET"])
def get_user(request, pk):
    """
    Returns email and id for a single user
    """
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CustomUserSerializer(user)

    return Response(serializer.data)


@api_view(["GET"])
def get_users(request):
    """
    Get list of users
    """
    paginator = LimitOffsetPagination()
    users = User.objects.all()
    result_page = paginator.paginate_queryset(users, request)
    serializer = CustomUserSerializer(result_page, many=True)

    return_data = paginator.get_paginated_response(serializer.data)
    return return_data
