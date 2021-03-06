"""
https://avilpage.com/2017/05/how-to-auto-reload-celery-workers-in-development.html
"""

import os
import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload

PIDFILE = "/code/celerybeat.pid"


def restart_celery_beat():
    cmd = "pkill -9 celery"
    subprocess.call(shlex.split(cmd))
    cmd = "celery beat --app=backend.celery_app:app --loglevel=info"
    cmd = f"celery beat --app=backend.celery_app:app --loglevel=info --pidfile={PIDFILE}"  # noqa
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Starting celery worker with autoreload...")  # noqa
        try:
            os.remove("celerybeat.pid")
        except FileNotFoundError as e:
            print(e)  # noqa
        autoreload.run_with_reloader(restart_celery_beat)
