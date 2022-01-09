from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)

from rest_framework.permissions import IsAuthenticated

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

from apps.accounts.serializers import (
    CustomUserSerializer,
    CustomUserRegistrationSerializer,
)
from apps.accounts.tokens import account_activation_token

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


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_profile(request):
    """
    Get profile for a single user
    """
    serializer = CustomUserSerializer(request.user)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def register(request):
    """
    Function-based view for registering a new user
    """
    serializer = CustomUserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.create(serializer.validated_data, request=request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def verify_email(request, uidb64, token):
    """
    Function-based view for verifying new user's email

    This view should be called by a POST request from a frontend application
    """
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        print("try success..")
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        print("here")
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

    return Response(status=status.HTTP_200_OK)
