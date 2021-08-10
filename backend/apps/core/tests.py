import pytest

from django.contrib.auth import get_user_model

from apps.core.models import RequestLog

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_request_log_middleware(client):
    header = {"HTTP_X_FORWARDED_FOR": "123.123.123.123"}
    client.get("/posts", follow=True, **header)

    assert RequestLog.objects.all().count() == 1

    request_log = RequestLog.objects.first()

    assert request_log.remote_address == "123.123.123.123"

    user = User.objects.create_user(
        email="user@email.com", password="abcd1234!", is_active=True
    )

    client.force_login(user)

    client.get("admin/core/requestlog/")

    assert RequestLog.objects.all().count() == 2
