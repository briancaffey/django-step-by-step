from django.conf import settings


def template_vars(request):
    data = {}
    data["FRONTEND_URL"] = settings.FRONTEND_URL
    return data
