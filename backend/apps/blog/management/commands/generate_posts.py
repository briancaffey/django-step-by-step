from django.core.management.base import BaseCommand

from apps.blog.factory import PostFactory


class Command(BaseCommand):
    help = "Generate some posts"

    def handle(self, *args, **options):

        print("generating posts")
        for _ in range(20):
            PostFactory()

        print("finished generating posts")
