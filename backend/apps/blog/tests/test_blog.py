import pytest

from django.contrib.auth import get_user_model
from django.urls import reverse


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
def test_post_not_found(client):
    response = client.get("post", kwargs={"id": 2})
    assert response.status_code == 404


@pytest.mark.django_db(transaction=True)
def test_homepage(client):
    response = client.get(reverse("index"))
    assert response.status_code == 200


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
def test_new_post_page(client):
    response = client.get(reverse("new-post"))
    assert response.status_code == 200
    assert "Create a new post" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_anonymous_post(client):
    anonymous_post = "an anonymous post"
    form_data = {"body": anonymous_post}
    response = client.post(reverse("new-post"), data=form_data, follow=True)
    assert response.status_code == 200
    assert anonymous_post in response.content.decode("utf-8")


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
    """
    Tests that a post can be updated through the update form
    """

    # create a user
    user = User.objects.create_user(
        email="user1@email.com", password="abcd1234!", is_active=True
    )

    anonymous_post = PostFactory(body="Anonymous Post")

    # create a post by that user
    post = PostFactory(created_by=user, body="Original post")

    client.force_login(user)

    # go to the page where the post can be edited
    response = client.get(
        reverse("update-post", kwargs={"id": anonymous_post.id}), follow=True
    )

    assert "You cannot edit an anonymous post" in response.content.decode("utf-8")

    # go to the page where the post can be edited
    response = client.get(
        reverse("update-post", kwargs={"id": post.id}),
    )

    assert "Edit" in response.content.decode("utf-8")

    # edit that post as the user
    response = client.post(
        reverse("update-post", kwargs={"id": post.id}),
        data={"body": "Original post, updated."},
        follow=True,
    )

    assert response.status_code == 200

    post.refresh_from_db()

    assert post.body == "Original post, updated."


@pytest.mark.django_db(transaction=True)
def test_edit_other_user_post(client):
    """
    Tests that a user can't update a post made by another user
    """

    # create a user
    user1 = User.objects.create_user(
        email="user1@email.com", password="abcd1234!", is_active=True
    )

    # create another user
    user2 = User.objects.create_user(
        email="user2@email.com", password="abcd1234!", is_active=True
    )

    # create a post by that user
    post = PostFactory(created_by=user1, body="Original post")

    client.force_login(user2)

    # go to the page where the post can be edited
    response = client.post(reverse("update-post", kwargs={"id": post.id}), follow=True)

    assert "You cannot edit this post" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_delete_post(client):
    """
    Tests that a post can be delete through the delete form
    """

    # create a user
    user = User.objects.create_user(
        email="user@email.com", password="abcd1234!", is_active=True
    )

    client.force_login(user)

    # create a post by that user
    post = PostFactory(created_by=user, body="Random post")

    assert Post.objects.all().count() == 1
    # delete that post as the user
    response = client.post(
        reverse("delete-post", kwargs={"id": post.id}),
        follow=True,
    )

    assert response.status_code == 200

    assert Post.objects.all().count() == 0


@pytest.mark.django_db(transaction=True)
def test_delete_anonymous_post(client):
    """
    Tests that an anonymous post cannot be deleted
    """

    # create a user
    user = User.objects.create_user(
        email="user@email.com", password="abcd1234!", is_active=True
    )

    client.force_login(user)

    # create a post by that user
    post = PostFactory(body="Random post")

    response = client.post(reverse("delete-post", kwargs={"id": post.id}), follow=True)

    assert "You cannot delete an anonymous post" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_like_post(client):
    """
    Tests that a post can be liked and unliked by a logged in user
    """

    # TODO: make tests more DRY

    # create a user
    user = User.objects.create_user(
        email="user@email.com", password="abcd1234!", is_active=True
    )

    client.force_login(user)

    # create a post by that user
    post = PostFactory(body="Awesome post")

    # post has no likes
    assert post.likes.all().count() == 0

    # user likes their own post
    response = client.post(reverse("like-post", kwargs={"id": post.id}), follow=True)

    assert response.status_code == 200

    # post has 1 like
    assert post.likes.all().count() == 1

    # user unlikes their own post
    response = client.post(reverse("like-post", kwargs={"id": post.id}), follow=True)

    assert post.likes.all().count() == 0
