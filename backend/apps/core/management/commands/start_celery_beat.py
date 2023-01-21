"""
https://avilpage.com/2017/05/how-to-auto-reload-celery-workers-in-development.html
"""

import os
import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload

# sets the PIDFILE environment variable
# docker-compose.yml sets a value for the PIDFILE environment variable
# otherwise use the default value for local python virtual environment
PIDFILE = os.environ.get("PIDFILE", "./backend/celerybeat.pid")


def restart_celery_beat():
    cmd = "pkill -9 celery"
    subprocess.call(shlex.split(cmd))
    cmd = f"celery --app=backend.celery_app:app beat --loglevel=info --pidfile={PIDFILE}"  # noqa
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Starting celery worker with autoreload...")  # noqa
        try:
            os.remove("celerybeat.pid")
        except FileNotFoundError as e:
            print(e)  # noqa
        autoreload.run_with_reloader(restart_celery_beat)
