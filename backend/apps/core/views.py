import subprocess

from django.http import JsonResponse
from django.shortcuts import render  # noqa
from rest_framework.views import APIView
from rest_framework import permissions


def health_check(request):
    return JsonResponse({"message": "OK"})


def index(request):
    return render(request, "index.html")


class VersionView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):

        # get the current git tag, if there is no tag, fall back to
        # the current git hash
        git_tag = "-"
        try:
            git_tag = (
                subprocess.check_output(
                    ["git", "describe", "--tags", "--abbrev=0", "--always"]
                )
                .strip()
                .decode()
            )
        except Exception:
            git_tag = "-"

        return JsonResponse({"git_tag": git_tag})
