from django.contrib import admin

from .models import RequestLog


class RequestLogAdmin(admin.ModelAdmin):
    class Meta:
        model = RequestLog

    search_fields = ("full_path",)

    list_select_related = ("user",)

    list_filter = ("method", "response_code", "user")

    readonly_fields = (
        "user",
        "date",
        "path",
        "full_path",
        "execution_time",
        "response_code",
        "method",
        "remote_address",
    )
    list_display = (
        "id",
        "user",
        "date",
        "path",
        "full_path",
        "execution_time",
        "response_code",
        "method",
        "remote_address",
    )


admin.site.register(RequestLog, RequestLogAdmin)
