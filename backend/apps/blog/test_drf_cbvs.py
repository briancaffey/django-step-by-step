import pytest

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from django.shortcuts import reverse

from apps.blog.factory import PostFactory
from apps.blog.models import Post

User = get_user_model()

# from apps.blog.factory import PostFactory


@pytest.mark.django_db(transaction=True)
def test_drf_cbv_get_post(client):
    user = User.objects.create_user(
        email="user@email.com", password="MyPassword!"
    )
    client = APIClient()

    client.force_login(user)

    post = PostFactory()

    response = client.get(
        reverse("drf-cbv-posts-detail", kwargs={"pk": post.id})
    )

    assert response.status_code == status.HTTP_200_OK

    response = client.get(reverse("drf-cbv-posts-detail", kwargs={"pk": 111}))

    assert response.status_code == status.HTTP_404_NOT_FOUND
