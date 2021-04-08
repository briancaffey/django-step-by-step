import pytest

from apps.blog.factory import PostFactory


@pytest.mark.django_db(transaction=True)
def test_drf_cbv_get_post(client):
    pass
