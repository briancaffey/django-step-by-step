import logging
import os
from backend.celery_app import app

from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model

from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


from apps.accounts.tokens import account_activation_token


User = get_user_model()

logger = logging.getLogger(__name__)


@app.task
def send_confirmation_email(*, user_id, domain):
    """
    https://studygyaan.com/django/how-to-signup-user-and-send-confirmation-email-in-django

    https://stackoverflow.com/questions/3005080/how-to-send-html-email-with-django-with-dynamic-content-in-it
    """
    user = User.objects.get(id=user_id)

    html_message = render_to_string(
        "emails/account_activation_email.html",
        {
            "user": user,
            "domain": domain,
            "uid": urlsafe_base64_encode(force_bytes(user.pk)),
            "token": account_activation_token.make_token(user),
        },
    )

    subject = f"Activate Your Account for {domain}"
    email = EmailMessage(
        subject,
        html_message,
        os.environ.get("DJANGO_EMAIL_HOST_USER", "debug+email@local.dev"),
        [settings.ADMIN_EMAIL],
    )
    email.content_subtype = "html"
    email.send()
