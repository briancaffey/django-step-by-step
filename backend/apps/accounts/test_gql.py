import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import graphql_query

from graphql_jwt.testcases import JSONWebTokenTestCase

import pytest

from apps.blog.factory import PostFactory
from apps.blog.models import PostLike

User = get_user_model()

# # https://docs.graphene-python.org/projects/django/en/latest/testing/
# # Create a fixture using the graphql_query helper and `client` fixture from `pytest-django`.
# @pytest.fixture
# def client_query(client):
#     def func(*args, **kwargs):
#         return graphql_query(*args, **kwargs, client=client)

#     return func


# # Test you query using the client_query fixture
# @pytest.mark.django_db(transaction=True)
# def test_gql_auth(client, client_query):

#     EMAIL = "user@email.com"
#     PASSWORD = "Abcd1234!"

#     user = get_user_model().objects.create_user(email=EMAIL, password=PASSWORD)
#     client.authenticate(user)

#     query = """
#     query GetUser($username: String!) {
#         user(email: $username) {
#           id
#         }
#     }"""

#     variables = {"username": EMAIL, "password": PASSWORD}

#     response = client_query(query, input_datavariables)

#     # .execute(query, variables)

#     content = json.loads(response.content)
#     print(content)
#     assert False
#     assert len(content["data"]["posts"]) == 5
#     assert "errors" not in content


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

        variables = {"email": self.EMAIL, "password": self.PASSWORD}

        resp = self.client.execute(query, variables)
        assert "error" not in str(resp.data)
