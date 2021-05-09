from django.http import JsonResponse
from django.shortcuts import render  # noqa

# Create your views here.
def health_check(request):
    return JsonResponse({"message": "OK"})
