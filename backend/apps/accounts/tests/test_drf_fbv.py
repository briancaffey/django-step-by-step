import pytest

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from django.core import mail
from django.shortcuts import reverse
from django.test import override_settings

# from apps.blog.factory import PostFactory
# from apps.blog.models import Post

User = get_user_model()


@pytest.mark.django_db(transaction=True)
@override_settings(CELERY_TASK_ALWAYS_EAGER=True)
def test_register_user(client):
    """
    Test register user. An email should be sent to the user upon registration.
    """
    url = reverse("drf-fbv-register")
    data = {"email": "user@email.com", "password": "foobar123!"}

    client = APIClient()

    response = client.post(url, data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.count() == 1
    assert User.objects.first().is_active is False
    assert len(mail.outbox) == 1
