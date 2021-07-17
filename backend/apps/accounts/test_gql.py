import json
import unittest

import pytest
import jwt

from django.contrib.auth import get_user_model
from django.shortcuts import reverse
from graphql_jwt.testcases import JSONWebTokenTestCase

User = get_user_model()

PYJWT_VERSION = tuple([int(x) for x in jwt.__version__.split(".")])
PYJWT_VERSION_CONFLICT = PYJWT_VERSION < (2, 0, 0)
print(PYJWT_VERSION_CONFLICT)
REASON = "PyJWT version"


class GqlUsersTests(JSONWebTokenTestCase):
    def setUp(self):
        self.EMAIL = "user@email.com"
        self.PASSWORD = "Abcd1234!"
        self.user = User.objects.create_user(
            email=self.EMAIL, password=self.PASSWORD
        )

    def test_gql_get_user(self):

        query = """mutation TokenAuth($email: String!, $password: String!) {
            tokenAuth(email: $email, password: $password) {
                token
                payload
            }
        }"""

        variable_values = {"email": self.EMAIL, "password": self.PASSWORD}

        resp = self.client.execute(query, variable_values)
        assert "error" not in str(resp.data)


@pytest.mark.skip(reason="For demonstration purpose only")
@pytest.mark.django_db(transaction=True)
def test_token_authentication(client):
    """
    This test is for demonstration purposes only

    Request an access token and then use the token
    to make an authenticated request

    https://towardsdatascience.com/connecting-to-a-graphql-api-using-python-246dda927840
    """

    EMAIL = "user@email.com"
    PASSWORD = "Abcd1234!"
    User.objects.create_user(email=EMAIL, password=PASSWORD)

    query = """
        mutation ObtainJSONWebToken ($email: String!, $password: String!) {
            tokenAuth (email: $email, password: $password) {
                payload
                token
                refreshExpiresIn
            }
        }
    """

    variable_values = {"email": "user@email.com", "password": "Abcd1234!"}

    body = {"query": query, "variable_values": variable_values}

    response = client.post(
        reverse("graphql"),
        data=json.dumps(body),
        content_type="application/json",
    )

    token = json.loads(response.content)["data"]["tokenAuth"]["token"]

    print(token)

    query = """
        mutation CreatePost($body: String!) {
            createPost(body: $body) {
                body
                id
                createdBy {
                    email
                }
            }
        }
    """

    variable_values = {"body": "test!"}

    body = {"query": query, "variable_values": variable_values}

    # https://stackoverflow.com/questions/15113248/django-tokenauthentication-missing-the-authorization-http-header
    headers = {"HTTP_AUTHORIZATION": f"JWT {token}"}

    assert response.status_code == 200

    response = client.post(
        reverse("graphql"),
        data=json.dumps(body),
        content_type="application/json",
        **headers,
    )

    print(response.content)

    assert (
        json.loads(response.content)["data"]["createPost"]["body"] == "test!"
    )

    assert (
        json.loads(response.content)["data"]["createPost"]["createdBy"][
            "email"
        ]
        == "user@email.com"
    )
