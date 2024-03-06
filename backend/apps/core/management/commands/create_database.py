"""
This command is used to create databases for ad hoc environments
"""
import os

from django.core.management.base import BaseCommand
from django.core.management import call_command

from apps.core.db import create_database


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument(
            "--database_name",
            action="store",
            dest="database_name",
            default=None,
            help="Optional database name argument",
        )

    def handle(self, *args, **options):
        database_name = options.get("database_name", os.environ.get("APP_ENV_NAME"))
        create_database(database_name)
