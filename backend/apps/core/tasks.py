import os
import time
from backend.celery_app import app

from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string


@app.task
def debug_task():
    time.sleep(5)
    return "Debug task slept for 5 second."


@app.task
def celery_beat_debug_task():
    return "Celery beat debug task complete."


@app.task
def send_email_debug_task():
    """
    Sends an email to Django admins
    """

    html_message = render_to_string(
        "emails/email_admins.html",
        {
            "message": "This email was sent successfully.",
        },
    )

    subject = "Debug Admin Email"
    email = EmailMessage(
        subject,
        html_message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.ADMIN_EMAIL],
    )
    email.content_subtype = "html"
    email.send()
