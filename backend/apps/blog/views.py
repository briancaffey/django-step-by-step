import logging


from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from apps.blog.models import Post
from apps.blog.forms import PostForm


logger = logging.getLogger()


def posts(request):
    posts = Post.objects.all()
    if request.GET.get("q"):
        search_query = request.GET.get("q")
        posts = posts.filter(body__icontains=search_query)
    paginator = Paginator(posts, 10)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(
        request, template_name="posts.html", context={"page_obj": page_obj}
    )


def post(request, id):

    post = Post.objects.get(id=id)

    return render(request, template_name="post.html", context={"post": post})


def new_post(request):

    if request.method == "POST":

        form = PostForm(request.POST)

        if form.is_valid():
            # process data
            logger.info("Form is valid")
            logger.info("saving form")
            post = form.save()
            if request.user.is_authenticated:
                post.created_by = request.user
                post.save()
            logger.info("form saved")
            messages.add_message(
                request,
                messages.SUCCESS,
                "Your post was created!",
                extra_tags="alert alert-success",
            )
            return HttpResponseRedirect(f"/posts/{post.id}")

    else:
        form = PostForm()

    return render(request, "new_post.html", {"form": form})


def edit_post(request, id):

    instance = get_object_or_404(Post, id=id)

    if instance.created_by is None:
        messages.add_message(
            request,
            messages.WARNING,
            "You can't edit an anonymous post",
            extra_tags="alert alert-warning",
        )
        return HttpResponseRedirect(f"/posts/{instance.id}")

    if request.method == "POST":

        if not request.user == instance.created_by:
            messages.add_message(
                request,
                messages.WARNING,
                "You can't edit this post",
                extra_tags="alert alert-warning",
            )
            return HttpResponseRedirect(f"/posts/{instance.id}")

        form = PostForm(request.POST or None, instance=instance)

        if form.is_valid():
            # process data
            logger.info("Form is valid")
            logger.info("saving form")
            post = form.save()
            logger.info("form saved")
            messages.add_message(
                request,
                messages.SUCCESS,
                "Your post was updated!",
                extra_tags="alert alert-success",
            )
            return HttpResponseRedirect(f"/posts/{post.id}")

    else:
        post = get_object_or_404(Post, id=id)
        form = PostForm(instance=post)

    return render(request, "edit_post.html", {"form": form})


@login_required
def delete_post(request, id):

    instance = get_object_or_404(Post, id=id)

    if instance.created_by is None:
        messages.add_message(
            request,
            messages.WARNING,
            "You can't delete an anonymous post",
            extra_tags="alert alert-warning",
        )
        return HttpResponseRedirect(f"/posts/{instance.id}")

    if request.method == "POST":
        # delete object
        instance.delete()
        messages.add_message(
            request,
            messages.WARNING,
            "Your post was deleted",
            extra_tags="alert alert-success",
        )
        # after deleting redirect to
        # home page
        return HttpResponseRedirect("/posts")

    return render(request, "posts.html", {})
