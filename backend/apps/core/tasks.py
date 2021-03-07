import os
import time
from backend.celery_app import app

from django.conf import settings
from django.core.mail import EmailMessage


@app.task
def debug_task():
    time.sleep(5)
    return "Debug task slept for 5 second."


@app.task
def celery_beat_debug_task():
    return "Celery beat debug task complete."


@app.task
def send_email_debug_task():

    email = EmailMessage(
        "Django Step-by-step",
        "This email was sent from Celery.",
        os.environ.get("DJANGO_EMAIL_HOST_USER", "debug+email@local.dev"),
        [settings.ADMIN_EMAIL],
    )

    email.send()
