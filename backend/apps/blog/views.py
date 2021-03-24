from django.shortcuts import render

from apps.blog.models import Post


def posts(request):
    context = {"posts": Post.objects.all()}
    return render(request, template_name="posts.html", context=context)
