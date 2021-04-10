from django.contrib.auth import get_user_model
from graphql_jwt.testcases import JSONWebTokenTestCase

User = get_user_model()


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
