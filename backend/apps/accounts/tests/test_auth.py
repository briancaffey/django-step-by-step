import json
import pytest

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model

# TODO: test password reset
# from django.core import mail
from django.shortcuts import reverse

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_obtain_jwt_token(client):
    """
    Test that a user can obtain a token that contains
    an access token and a refresh_token HttpOnly cookie
    """
    # GIVEN a user that has been created in the database
    client = APIClient()
    email = "user1@email.com"
    password = "foobar123!"
    _ = User.objects.create_user(email=email, password=password, is_active=True)

    # WHEN the user logs in
    url = reverse("jwt_token_obtain_pair")
    data = {"email": email, "password": password}
    response = client.post(url, data=data)

    # THEN has a JWT in the response body and a refresh HttpOnly cookie
    assert response.status_code == status.HTTP_200_OK
    assert "access" in json.loads(response.content).keys()
    assert "HttpOnly;" in str(response.client.cookies.get("refresh_token"))
