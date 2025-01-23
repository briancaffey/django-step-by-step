from datetime import datetime, timezone

from django.conf import settings
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
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.serializers import (
    CustomUserSerializer,
    CustomUserRegistrationSerializer,
    UserUpdateSerializer,
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


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_details(request):
    user = request.user
    serializer = UserUpdateSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    Function-based view for verifying new user's email and setting JWT tokens as HttpOnly cookies.

    Args:
        request: The HTTP request object
        uidb64: Base64 encoded user ID
        token: Email verification token

    Returns:
        Response with HttpOnly cookies for access and refresh JWT tokens
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

    # Generate tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    # set cookies for access and refresh tokens here
    response = Response({
        "message": "Email verified successfully",
        "user": {
            "email": user.email,
            "id": user.id
        }
    })

    # Calculate expiry for cookies
    access_token_expiry = datetime.now(timezone.utc) + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
    refresh_token_expiry = datetime.now(timezone.utc) + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
    access_token_max_age = int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
    refresh_token_max_age = int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())

    # Set access token cookie
    response.set_cookie(
        "access",  # Changed from access_token to match your naming
        access_token,
        max_age=access_token_max_age,
        httponly=True,
        samesite="None",
        secure=True,
    )

    response.set_cookie(
        "refresh_token",
        refresh_token,
        max_age=refresh_token_max_age,
        httponly=True,
        samesite="None",
        secure=True,
    )

    return response
