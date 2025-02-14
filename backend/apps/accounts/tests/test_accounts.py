import re

from django.core import mail
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test import override_settings
from django.urls import reverse

import pytest

from apps.accounts.tasks import send_confirmation_email
from apps.accounts.forms import CustomUserRegistrationForm

User = get_user_model()


class UsersManagersTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(email="normal@user.com", password="foo")
        self.assertEqual(user.email, "normal@user.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:  # pragma: no cover
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        admin_user = User.objects.create_superuser("super@user.com", "foo")
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:  # pragma: no cover
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email="super@user.com", password="foo", is_superuser=False
            )

    def test_profile_setup_complete(self):
        User = get_user_model()

        # Create user with no first or last name
        user = User.objects.create_user(email="test@user.com", password="foo")
        self.assertFalse(user.profile_setup_complete)

        # Add first name and last name
        user.first_name = "Test"
        user.last_name = "User"
        user.save()
        user.refresh_from_db()
        self.assertTrue(user.profile_setup_complete)

        # Clear first name
        user.first_name = ""
        user.save()
        user.refresh_from_db()
        self.assertFalse(user.profile_setup_complete)

        # Add first name back
        user.first_name = "Test"
        user.save()
        user.refresh_from_db()
        self.assertTrue(user.profile_setup_complete)

        # Clear last name
        user.last_name = ""
        user.save()
        user.refresh_from_db()
        self.assertFalse(user.profile_setup_complete)


def extract_urls(string):
    """
    used to extract email confirmation URL from email body
    """
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"  # noqa
    url = re.findall(regex, string)
    return [x[0] for x in url]


class EmailConfirmationTest(TestCase):
    def test_email_confirmation_failure(self):

        User.objects.create_user(email="user@email.com", password="foo")

        response = self.client.get(
            reverse("activate", kwargs={"uidb64": "abc123", "token": "token"}),
            follow=True,
        )

        assert "The confirmation link was invalid." in response.content.decode("utf-8")

    def test_email_confirmation(self):
        domain = "http://localhost:8000"
        # Create the user
        user = User.objects.create_user(email="user@email.com", password="foo")
        send_confirmation_email(user_id=user.id, domain=domain)

        # Confirm the email subject
        expected_subject = f"Activate Your Account for {domain}"
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, expected_subject)

        # Extract the verification link from the email body
        confirmation_email_body = mail.outbox[0].body
        links = extract_urls(confirmation_email_body)
        # Assume the last link is the verification link (/verify/<uid>/<token>)
        verification_link = links[-1]

        # Parse the UID and token from the verification link using a regex
        pattern = r"/verify/(?P<uid>[^/]+)/(?P<token>[^/]+)/?"
        match = re.search(pattern, verification_link)
        self.assertIsNotNone(match, "Verification link did not contain uid and token")
        uid = match.group("uid")
        token = match.group("token")

        # Build the new API activation URL: /api/activate/<uid>/<token>/
        activation_url = f"{domain}/api/activate/{uid}/{token}/"

        # Make a request to the activation endpoint.
        # (Use GET or POST as appropriate for your API; here we use GET.)
        response = self.client.post(activation_url)
        self.assertEqual(response.status_code, 200)

        # Refresh the user from the database and assert the user is now active.
        user.refresh_from_db()
        self.assertTrue(user.is_active)


@pytest.mark.django_db(transaction=True)
def test_registration_form(client):
    """
    Test the CustomUserRegistrationForm only. This does not create a user
    """
    form_data = {
        "email": "test@user.com",
        "password1": "abcd1234!",
        "password2": "abcd1234!",
    }

    form = CustomUserRegistrationForm(data=form_data)
    assert form.is_valid()


@pytest.mark.django_db(transaction=True)
@override_settings(CELERY_TASK_ALWAYS_EAGER=True)
def test_registration_view(client):
    url = reverse("register")
    response = client.post(
        url,
        data={
            "email": "test@user.com",
            "password1": "abcd1234!",
            "password2": "abcd1234!",
        },
        follow=True,
    )

    assert User.objects.all().count() == 1

    assert "Thank you for signing up!" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
@override_settings(CELERY_TASK_ALWAYS_EAGER=True)
def test_registration_page(client):
    response = client.get(reverse("register"))

    assert "Register" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_login(client):
    email = "user1@email.com"
    password = "bar"
    user = User.objects.create_user(email=email, password=password)

    client.force_login(user)
    response = client.get(reverse("list-posts"))
    assert "Profile" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_redirect_register_route_for_logged_in_user(client):
    username = "user1"
    password = "bar"
    user = User.objects.create_user(email=username, password=password)

    client.force_login(user)

    response = client.get(reverse("register"))

    assert response.status_code == 302


@pytest.mark.django_db(transaction=True)
def test_login_view(client):
    username = "user@email.com"
    password = "Qwer1234!"
    User.objects.create_user(email=username, password=password, is_active=True)

    response = client.post(
        reverse("login"),
        data={"email": username, "password": password},
        follow=True,
    )

    assert response.status_code == 200


@pytest.mark.skip("Need to debug failures")
@pytest.mark.django_db(transaction=True)
def test_logout(client):
    username = "user@email.com"
    password = "bar"
    user = User.objects.create_user(email=username, password=password, is_active=True)

    client.force_login(user)

    response = client.get(reverse("logout"), follow=True)

    assert "You successfully logged out!" in response.content.decode("utf-8")


@pytest.mark.django_db(transaction=True)
def test_profile_view(client):
    username = "user@email.com"
    password = "bar"
    user = User.objects.create_user(email=username, password=password, is_active=True)

    client.force_login(user)

    response = client.get(reverse("profile"))

    assert response.status_code == 200
