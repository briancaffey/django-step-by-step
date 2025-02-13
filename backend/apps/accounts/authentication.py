from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class HttpOnlyJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access")
        if not access_token:
            return None  # No token, return None to continue with other auth methods

        try:
            decoded_token = AccessToken(access_token)
            user = User.objects.get(id=decoded_token["user_id"])
        except (User.DoesNotExist, Exception) as e:
            raise AuthenticationFailed("Invalid or expired token")

        return (user, None)
