import pytest

from django.contrib.auth import get_user_model
from django.urls import reverse


from apps.blog.factory import PostFactory
from apps.blog.models import Post

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_post_list_cbv(client):

    POST_TEXT = "This is the first post test post."
    SECOND_POST_TEXT = "This is another post"

    # this saves the post in the database
    PostFactory(body=POST_TEXT)
    PostFactory(body=SECOND_POST_TEXT)

    response = client.get(reverse("post-list-cbv"))

    assert response.status_code == 200

    response = client.get(reverse("post-list-cbv"), data={"q": "another"})

    assert "first" not in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_post_detail_cbv(client):

    POST_TEXT = "This is the first post test post."

    # this saves the post in the database
    post = PostFactory(body=POST_TEXT)

    response = client.get(reverse("post-detail-cbv", kwargs={"pk": post.id}))

    assert POST_TEXT in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_post_create_and_update_cbv(client):

    POST_TEXT = "This is the first post test post."

    user = User.objects.create_user(
        email="foo@bar.com", password="Qwer1234!", is_active=True
    )

    client.force_login(user)

    form_data = {"body": POST_TEXT}
    response = client.post(reverse("post-create-cbv"), data=form_data, follow=True)

    assert response.status_code == 200

    assert Post.objects.all().count() == 1

    post = Post.objects.first()

    response = client.post(
        reverse("post-update-cbv", kwargs={"pk": post.id}),
        data={"body": "Updated"},
    )


@pytest.mark.django_db(transaction=True)
def test_post_only_editable_for_owner(client):
    """
    Tests that anonymous posts cannot be edit and that posts
    can only be edited by the user that created the post
    """

    POST_TEXT = "Test post."

    user1 = User.objects.create_user(
        email="foo@bar.com", password="Qwer1234!", is_active=True
    )
    user2 = User.objects.create_user(
        email="baz@bar.com", password="Qwer1234!", is_active=True
    )

    post = PostFactory(body=POST_TEXT, created_by=user1)

    client.force_login(user2)

    response = client.post(
        reverse("post-update-cbv", kwargs={"pk": post.id}),
        data={"body": "Updated"},
        follow=True,
    )

    post.refresh_from_db()

    assert post.body == "Test post."

    assert response.status_code == 403


@pytest.mark.django_db(transaction=True)
def test_post_404(client):
    user = User.objects.create_user(
        email="foo@bar.com", password="Qwer1234!", is_active=True
    )

    client.force_login(user)

    response = client.get(reverse("post-detail-cbv", kwargs={"pk": 1}))

    assert response.status_code == 404


@pytest.mark.django_db(transaction=True)
def test_delete_post_cbv(client):

    user = User.objects.create_user(
        email="foo@bar.com", password="Qwer1234!", is_active=True
    )

    POST_TEXT = "This is the first post test post."

    # this saves the post in the database
    post = PostFactory(created_by=user, body=POST_TEXT)

    response = client.get(reverse("post-delete-cbv", kwargs={"pk": 100}))

    assert response.status_code == 404

    response = client.get(reverse("post-delete-cbv", kwargs={"pk": post.id}))

    assert "Are you sure you want to delete this post?" in response.content.decode(
        "utf-8"
    )

    response = client.post(reverse("post-delete-cbv", kwargs={"pk": post.id}))

    assert Post.objects.count() == 0
