import pytest

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils.http import urlencode


from apps.blog.factory import PostFactory
from apps.blog.models import Post

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_post():

    POST_TEXT = "This is a test post."

    # this saves the post in the database
    post = PostFactory(body=POST_TEXT)

    # this queries the database for the number of posts
    post_count = Post.objects.count()

    # checks to see if the number of posts queried is 1
    assert post_count == 1

    # checks that the post has the body that we assigned to it in the test
    assert post.body == POST_TEXT


@pytest.mark.django_db(transaction=True)
def test_homepage(client):
    response = client.get("/")
    assert response.status_code == 302


@pytest.mark.django_db(transaction=True)
def test_search_posts(client):

    posts = ["Post A", "Post B", "Post C"]

    for post in posts:
        PostFactory(body=post)

    assert Post.objects.all().count() == 3

    query_params = dict(q="C")
    url = reverse("list-posts")

    response = client.get(url, query_params)

    response_html = response.content.decode("utf-8")

    assert "Post A" not in response_html
    assert "Post C" in response_html


@pytest.mark.django_db(transaction=True)
def test_create_post(client):

    """
    Test the view that creates a post. This indirectly tests PostForm
    """
    user = User.objects.create_user(
        email="user@email.com", password="abcd1234!", is_active=True
    )

    client.force_login(user)

    form_data = {"body": "Test post."}
    response = client.post(reverse("new-post"), data=form_data, follow=True)

    assert "Your post was created!" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_edit_post(client):

    # create a user

    # create a post by that user

    # edit that post as the user
    pass
