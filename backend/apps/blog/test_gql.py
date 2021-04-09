import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import graphql_query
from graphql_jwt.testcases import JSONWebTokenTestCase

import pytest

from apps.blog.factory import PostFactory
from apps.blog.models import PostLike

User = get_user_model()


# https://docs.graphene-python.org/projects/django/en/latest/testing/
# Create a fixture using the graphql_query helper and `client` fixture from `pytest-django`.
@pytest.fixture
def client_query(client):
    def func(*args, **kwargs):
        return graphql_query(*args, **kwargs, client=client)

    return func


# Test you query using the client_query fixture
@pytest.mark.django_db(transaction=True)
def test_gql_post_query(client_query):
    EMAIL = "user@email.com"
    PASSWORD = "Abcd1234!"
    user = User.objects.create_user(email=EMAIL, password=PASSWORD)

    for post in [
        ("Post A", user),
        ("Post B", user),
        ("Post 1C", user),  # our search should only return this post
        ("Post C1", None),
    ]:
        PostFactory(body=post[0], created_by=post[1])

    response = client_query(
        """
            query ($by_creator_id: Int) {
                posts (search: "1C", byCreatorId: $by_creator_id) {
                    id
                    body
                }
            }
        """
    )

    content = json.loads(response.content)
    print(content)
    assert len(content["data"]["posts"]) == 1
    assert "errors" not in content


class GqlPostTests(JSONWebTokenTestCase):
    def setUp(self):
        self.EMAIL = "user@email.com"
        self.PASSWORD = "Abcd1234!"
        self.user = User.objects.create_user(
            email=self.EMAIL, password=self.PASSWORD
        )

    def test_get_post(self):
        post = PostFactory(body="This is a post")

        query = """
            query ($post_id: Int!) {
                post (postId: $post_id) {
                    body
                    id
                }
            }
        """
        variables = {"post_id": post.id}
        resp = self.client.execute(query, variables)

        assert "This is a post" in str(resp.data)

    def test_search_and_filter_posts(self):

        for post in [
            ("Post A", self.user),
            ("Post B", self.user),
            ("Post 1C", self.user),  # our search should only return this post
            ("Post C1", None),
        ]:
            PostFactory(body=post[0], created_by=post[1])

        query = """
            query ($by_creator_id: Int, $search: String!) {
                posts (byCreatorId: $by_creator_id, search: $search, ) {
                    id
                    body
                }
            }
        """

        variables = {"by_creator_id": self.user.id, "search": "C"}
        resp = self.client.execute(query, variables)

        assert "Post 1C" in str(resp.data)

    def test_gql_get_posts(self):
        post = PostFactory()

        _ = PostLike(liked_by=self.user, post=post)
        _.save()

        self.client.authenticate(self.user)

        query = """
            query {
                posts {
                    body
                    liked
                    likeCount
                }
            }
        """

        resp = self.client.execute(query)

        self.assertEqual(resp.data["posts"][0]["likeCount"], 1)

    def test_create_post_mutation(self):

        query = """
            mutation CreatePost($body: String!) {
                createPost(body: $body) {
                    body
                    id
                }
            }
        """

        variables = {"body": "this is a post created using a gql mutation"}

        resp = self.client.execute(query, variables)

        assert "this is a post" in str(resp.data)

    def test_create_post_as_authenticated_user_mutation(self):

        self.client.authenticate(self.user)

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

        variables = {"body": "this is a post created using a gql mutation"}

        resp = self.client.execute(query, variables)

        assert "this is a post" in str(resp.data)

        assert self.EMAIL in str(resp.data)

    def test_update_post_mutation(self):

        ANONYMOUS_POST_TEXT = "An anonymous post."
        USER_POST_TEXT = "User post."
        OTHER_USER_POST_TEXT = "Other user post."
        anonymous_post = PostFactory(body=ANONYMOUS_POST_TEXT)
        user_post = PostFactory(
            body=USER_POST_TEXT,
            created_by=self.user,
        )
        other_user = User.objects.create_user(
            email="other@email.com", password=self.PASSWORD
        )
        other_post = PostFactory(
            body=OTHER_USER_POST_TEXT,
            created_by=other_user,
        )

        query = """
            mutation UpdatePost($post_id: Int!, $body: String!) {
                updatePost(postId: $post_id, body: $body) {
                    post {
                        id
                        body
                        liked
                        likeCount
                    }
                }
            }
        """

        # try to update anonymous post
        resp = self.client.execute(
            query,
            {
                "post_id": anonymous_post.id,
                "body": ANONYMOUS_POST_TEXT + " Updated.",
            },
        )

        # expect error
        assert "Must be logged in to update a post." in str(resp)

        # authenticate so user can update post
        self.client.authenticate(self.user)

        # try to update user's own post
        resp = self.client.execute(
            query,
            {"post_id": user_post.id, "body": USER_POST_TEXT + " Updated."},
        )

        user_post.refresh_from_db()

        assert user_post.body.endswith(" Updated.")

        # expect error
        assert "error" not in str(resp.data)

        # try to update another user's post
        resp = self.client.execute(
            query,
            {
                "post_id": other_post.id,
                "body": OTHER_USER_POST_TEXT + " Updated.",
            },
        )
        # expect error
        assert "error" not in str(resp.data)

    def test_delete_post_mutation(self):

        anonymous_post = PostFactory(
            body="Anonymous post that cannot be deleted."
        )
        user_post = PostFactory(
            body="Post owned by a user that can be deleted.",
            created_by=self.user,
        )
        other_user = User.objects.create_user(
            email="other@email.com", password=self.PASSWORD
        )
        other_post = PostFactory(
            body="Post owned by a user that can be deleted.",
            created_by=other_user,
        )

        query = """
            mutation DeletePost($post_id: Int!) {
                deletePost(postId: $post_id) {
                    ok
                }
            }
        """

        # try to delete anonymous post
        resp = self.client.execute(query, {"post_id": anonymous_post.id})

        # expect error
        assert "Must be logged in to delete a post." in str(resp)

        # authenticate so user can delete post
        self.client.authenticate(self.user)

        # delete user's own post
        resp = self.client.execute(query, {"post_id": user_post.id})

        # expect error
        assert "error" not in str(resp.data)

        # try to delete another user's post
        resp = self.client.execute(query, {"post_id": other_post.id})
        # expect error
        assert "error" not in str(resp.data)

    def test_toggle_post_list_mutation(self):

        # must be logged in to create a post
        self.client.authenticate(self.user)

        post = PostFactory(
            body="This is a post that will be liked.", created_by=self.user
        )

        query = """
            mutation TogglePostLike($post_id: Int!) {
                togglePostLike(postId: $post_id) {
                    likeCount
                    liked
                    post {
                        body
                        liked
                        likeCount
                        id
                        createdBy {
                            email
                        }
                    }
                }
            }
        """

        variables = {"post_id": post.id}

        # TODO: check to see if this number of queries is correct
        # It seems high
        with self.assertNumQueries(7):
            resp = self.client.execute(query, variables)

        assert "error" not in str(resp.data)
