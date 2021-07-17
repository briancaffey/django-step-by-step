from rest_framework import serializers

from django.conf import settings
from django.contrib.auth import get_user_model

from apps.accounts.tasks import send_confirmation_email

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "id")


class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password")

    def create(self, validated_data, *args, **kwargs):
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["password"],
            # newly created user is not active until email is verified
            is_active=False,
        )

        # this celery task will send the confirmation email
        send_confirmation_email.apply_async(
            kwargs={
                "user_id": user.id,
                "domain": settings.FRONTEND_URL,
            }
        )
        return user
