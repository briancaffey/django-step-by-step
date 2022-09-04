"""
This commands calls other Django management commands to perform pre-update tasks
during the update process.

This may include:

    - applying migrations to database with `migrate`
    - `collectstatic`
    - loading fixtures
    - clearing cache (redis)
"""

from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    def handle(self, *args, **options):

        # collectstatic
        call_command("collectstatic", "--no-input")
        # migrate
        call_command("migrate")
