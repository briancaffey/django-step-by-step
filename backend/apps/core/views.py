from django.http import JsonResponse
from django.shortcuts import render  # noqa


def health_check(request):
    return JsonResponse({"message": "OK"})


def index(request):
    return render(request, "index.html")
