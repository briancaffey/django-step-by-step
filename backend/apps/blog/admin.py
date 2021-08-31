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


class PostLikeAdmin(admin.ModelAdmin):
    class Meta:
        model = PostLike

    list_display = ("liked_by", "post", "liked_on")


admin.site.register(Post, PostAdmin)
admin.site.register(PostLike, PostLikeAdmin)
