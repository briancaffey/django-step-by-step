import pytest

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from django.shortcuts import reverse

from apps.blog.factory import PostFactory
from apps.blog.models import Post

User = get_user_model()


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-get-post", "drf-cbv-posts-detail"],
)
@pytest.mark.django_db(transaction=True)
def test_get_post_drf_fbv(client, reverse_url):
    user = User.objects.create_user(email="user@email.com", password="MyPassword!")
    client = APIClient()

    client.force_login(user)

    post = PostFactory()

    response = client.get(reverse(reverse_url, kwargs={"pk": post.id}))

    assert response.status_code == status.HTTP_200_OK

    response = client.get(reverse(reverse_url, kwargs={"pk": 111}))

    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-list-posts", "drf-cbv-posts-list"],
)
@pytest.mark.django_db(transaction=True)
def test_list_posts_drf_fbv(reverse_url):

    client = APIClient()

    for _ in range(3):
        PostFactory()

    response = client.get(reverse(reverse_url))

    assert response.status_code == status.HTTP_200_OK
    assert response.data.get("count") == 3


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-list-posts", "drf-cbv-posts-list"],
)
@pytest.mark.django_db(transaction=True)
def test_create_post_drf_fbv(reverse_url):

    client = APIClient()

    user = User.objects.create_user(email="user@email.com", password="MyPassword!")

    post_data = {"body": "my post"}
    response = client.post(reverse("drf-fbv-create-post"), data=post_data)

    assert response.status_code == status.HTTP_201_CREATED

    response = client.post(
        reverse("drf-fbv-create-post"), data={"some_field": "some value"}
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    client.force_login(user)

    response = client.post(reverse("drf-fbv-create-post"), data={"body": "my post"})

    assert response.status_code == status.HTTP_201_CREATED

    print(Post.objects.all().count())
    assert Post.objects.filter(created_by=user).count() == 1


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-update-post", "drf-cbv-posts-detail"],
)
@pytest.mark.django_db(transaction=True)
def test_update_post_drf_fbv(reverse_url):
    user1 = User.objects.create_user(email="user@email.com", password="MyPassword!")

    user2 = User.objects.create_user(email="user2@email.com", password="MyPassword!")

    client = APIClient()

    client.force_login(user1)

    post_data = {"body": "first draft"}

    post = PostFactory(created_by=user1, body=post_data)

    updated_post_data = {"body": "second draft"}

    response = client.put(
        reverse(reverse_url, kwargs={"pk": post.id}),
        data=updated_post_data,
    )

    assert response.data.get("body") == "second draft"
    assert response.status_code == status.HTTP_200_OK

    assert Post.objects.all().count() == 1

    response = client.put(
        reverse(reverse_url, kwargs={"pk": 404}),
        data=updated_post_data,
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND

    response = client.put(
        reverse(reverse_url, kwargs={"pk": post.id}),
        data={"body": "long" * 100},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    unauthorized_update_data = {"body": "this will not work"}

    client.force_login(user2)

    response = client.put(
        reverse(reverse_url, kwargs={"pk": post.id}),
        data=unauthorized_update_data,
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-delete-post", "drf-cbv-posts-detail"],
)
@pytest.mark.django_db(transaction=True)
def test_delete_post_drf_fbv(reverse_url):
    user1 = User.objects.create_user(email="user@email.com", password="MyPassword!")

    user2 = User.objects.create_user(email="user2@email.com", password="MyPassword!")
    client = APIClient()

    post_data = {"body": "first draft"}

    post1 = PostFactory(created_by=user1, body=post_data)

    response = client.delete(reverse(reverse_url, kwargs={"pk": post1.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN

    client.force_login(user1)

    response = client.delete(reverse(reverse_url, kwargs={"pk": post1.id}))

    assert response.status_code == status.HTTP_204_NO_CONTENT

    post2 = PostFactory(created_by=user1, body="some post")

    client.force_login(user2)

    response = client.delete(reverse(reverse_url, kwargs={"pk": post2.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.parametrize(
    "reverse_url",
    ["drf-fbv-like-post", "drf-cbv-posts-like"],
)
@pytest.mark.django_db(transaction=True)
def test_like_post_drf_fbv(reverse_url):
    user = User.objects.create_user(email="user@email.com", password="MyPassword!")
    client = APIClient()

    post_data = {"body": "first draft"}

    post = PostFactory(created_by=user, body=post_data)

    response = client.post(reverse(reverse_url, kwargs={"pk": post.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN

    client.force_login(user)

    response = client.post(reverse(reverse_url, kwargs={"pk": post.id}))

    assert response.status_code == status.HTTP_200_OK

    response = client.post(reverse(reverse_url, kwargs={"pk": post.id}))

    assert response.status_code == status.HTTP_200_OK

    assert post.likes.count() == 0

    response = client.post(reverse(reverse_url, kwargs={"pk": 404}))

    assert response.status_code == status.HTTP_404_NOT_FOUND
