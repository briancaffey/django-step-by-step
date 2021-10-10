from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render  # noqa
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from .tasks import send_email_debug_task


def health_check(request):
    return JsonResponse({"message": "OK"})


def index(request):
    return render(request, "index.html")

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def trigger_exception(request):
    """
    Triggers an exception. used for testing
    """
    raise Exception("Triggering Exception...")

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def email_admins(request):
    send_email_debug_task.apply_async()
    return JsonResponse({"message": "Email sent!"})
