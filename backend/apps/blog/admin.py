from django.contrib import admin

# Register your models here.
from .models import Post, PostLike

admin.site.register(Post)
admin.site.register(PostLike)
