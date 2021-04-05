from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
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
