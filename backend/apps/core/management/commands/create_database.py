"""
This command is used to create databases for ad hoc environments
"""
import os

from django.core.management.base import BaseCommand

from apps.core.db import create_database


class Command(BaseCommand):
    def handle(self, *args, **options):
        print(f"APP_NAME is {os.environ.get("APP_NAME", None)}")
        database_name = os.environ.get("APP_NAME", None)
        create_database(f"{database_name}-db")
