"""
This commands calls other Django management commands to perform pre-update tasks
during the update process.

This may include:

    - applying migrations to database with `migrate`
    - `collectstatic`
    - loading fixtures
    - clearing cache (redis)
"""
import os

from django.core.management.base import BaseCommand
from django.core.management import call_command

from apps.core.db import create_database


class Command(BaseCommand):
    def handle(self, *args, **options):

        # create database for the environment if it does not exist
        call_command("create_database")

        # collectstatic
        call_command("collectstatic", "--no-input")
        # migrate
        call_command("migrate")
