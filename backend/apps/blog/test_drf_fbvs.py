import pytest

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from django.shortcuts import reverse

from apps.blog.factory import PostFactory
from apps.blog.models import Post

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_get_post_drf_fbv():
    user = User.objects.create_user(
        email="user@email.com", password="MyPassword!"
    )
    client = APIClient()

    client.force_login(user)

    post = PostFactory()

    client.get(reverse("drf-fbv-get-post", kwargs={"pk": post.id}))


@pytest.mark.django_db(transaction=True)
def test_list_posts_drf_fbv():

    client = APIClient()

    for _ in range(3):
        PostFactory()

    response = client.get(reverse("drf-fbv-list-posts"))

    assert response.status_code == status.HTTP_200_OK
    assert response.data.get("count") == 3


@pytest.mark.django_db(transaction=True)
def test_create_post_drf_fbv():

    client = APIClient()

    post_data = {"body": "my post"}
    response = client.post(reverse("drf-fbv-create-post"), data=post_data)

    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(
        reverse("drf-fbv-create-post"), data={"some_field": "some value"}
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db(transaction=True)
def test_update_post_drf_fbv():
    user = User.objects.create_user(
        email="user@email.com", password="MyPassword!"
    )
    client = APIClient()

    client.force_login(user)

    post_data = {"body": "first draft"}

    post = PostFactory(created_by=user, body=post_data)

    updated_post_data = {"body": "second draft"}

    response = client.put(
        reverse("drf-fbv-update-post", kwargs={"pk": post.id}),
        data=updated_post_data,
    )

    assert response.data.get("body") == "second draft"
    assert response.status_code == status.HTTP_200_OK

    assert Post.objects.all().count() == 1


@pytest.mark.django_db(transaction=True)
def test_delete_post_drf_fbv():
    user = User.objects.create_user(
        email="user@email.com", password="MyPassword!"
    )
    client = APIClient()

    post_data = {"body": "first draft"}

    post = PostFactory(created_by=user, body=post_data)

    response = client.delete(
        reverse("drf-fbv-delete-post", kwargs={"pk": post.id})
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

    client.force_login(user)

    response = client.delete(
        reverse("drf-fbv-delete-post", kwargs={"pk": post.id})
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db(transaction=True)
def test_like_post_drf_fbv():
    user = User.objects.create_user(
        email="user@email.com", password="MyPassword!"
    )
    client = APIClient()

    post_data = {"body": "first draft"}

    post = PostFactory(created_by=user, body=post_data)

    response = client.post(
        reverse("drf-fbv-like-post", kwargs={"pk": post.id})
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

    client.force_login(user)

    response = client.post(
        reverse("drf-fbv-like-post", kwargs={"pk": post.id})
    )

    assert response.status_code == status.HTTP_200_OK
