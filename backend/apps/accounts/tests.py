import re

from django.core import mail
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

import pytest

from apps.accounts.tasks import send_confirmation_email
from apps.accounts.forms import CustomUserRegistrationForm

User = get_user_model()


class UsersManagersTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            email="normal@user.com", password="foo"
        )
        self.assertEqual(user.email, "normal@user.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
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
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email="super@user.com", password="foo", is_superuser=False
            )


def extract_urls(string):
    """
    used to extract email confirmation URL from email body
    """
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    url = re.findall(regex, string)
    return [x[0] for x in url]


class EmailConfirmationTest(TestCase):
    def test_email_confirmation(self):
        domain = "http://localhost:8000"
        user = User.objects.create_user(email="user@email.com", password="foo")
        send_confirmation_email(user_id=user.id, domain=domain)
        subject = f"Activate Your Account for {domain}"
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, subject)

        confirmation_link = mail.outbox[0].body

        links = extract_urls(confirmation_link)

        confirmation_link = links[-1]

        response = self.client.get(confirmation_link, follow=True).content

        assert b"Your email has been confirmed." in response


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

    assert b"Thank you for signing up!" in response.content


@pytest.mark.django_db(transaction=True)
def test_login(client):
    username = "user1"
    password = "bar"
    User.objects.create_user(email=username, password=password)
    # Use this:
    # client.force_login(user)
    # Or this:
    client.login(username=username, password=password)
    response = client.get("/posts")
    assert b"Profile" in response.content
