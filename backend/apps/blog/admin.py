from django.contrib import admin

# Register your models here.
from .models import Post, PostLike


class PostAdmin(admin.ModelAdmin):
    class Meta:
        model = Post

    search_fields = ("body",)

    list_display = (
        "body",
        "created_on",
        "created_by",
        "image",
    )


admin.site.register(Post, PostAdmin)
admin.site.register(PostLike)
