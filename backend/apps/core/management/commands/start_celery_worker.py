"""
https://avilpage.com/2017/05/how-to-auto-reload-celery-workers-in-development.html
"""

import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload

PIDFILE = "/code/celerybeat.pid"


def restart_celery_worker():
    cmd = "pkill -9 celery"
    subprocess.call(shlex.split(cmd))
    # fmt: off
    cmd = 'celery --app=backend.celery_app:app worker -Q default --concurrency=1 --loglevel=INFO' # noqa
    # fmt: on
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    def handle(self, *args, **options):
        autoreload.run_with_reloader(restart_celery_worker)
