import logging


from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Count, Exists, OuterRef
from django.http import HttpResponseRedirect, JsonResponse, Http404
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_POST


from apps.blog.models import Post, PostLike
from apps.blog.forms import PostForm


logger = logging.getLogger()


def posts(request):

    posts = (
        Post.objects.all()
        .prefetch_related("created_by")
        .annotate(
            like_count=Count("likes"),
            # see if the request.user liked the post
            liked=Exists(
                PostLike.objects.filter(
                    liked_by_id=request.user.id or None,
                    post=OuterRef("id"),
                )
            ),
        )
    ).order_by("-modified_on")

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

    post = (
        Post.objects.prefetch_related("created_by")
        .annotate(
            like_count=Count("likes"),
            liked=Exists(
                PostLike.objects.filter(
                    liked_by_id=request.user.id, post=OuterRef("id")
                )
            ),
        )
        .get(id=id)
    )

    return render(request, template_name="post.html", context={"post": post})


def new_post(request):

    if request.method == "POST":

        form = PostForm(request.POST)

        if form.is_valid():
            # process data
            post = form.save()
            if request.user.is_authenticated:
                post.created_by = request.user
                post.save()
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


@login_required
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
            post = form.save()
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


@login_required
@require_POST
def like_post(request, id):

    # implement like post logic
    post = get_object_or_404(Post, id=id)

    if request.user not in post.likes.all():
        post_like_through_model = PostLike(post=post, liked_by=request.user)
        post_like_through_model.save()
        like = True
    else:
        post.likes.remove(request.user)
        like = False

    post_like_count = post.likes.all().count()
    return JsonResponse({"likes": post_like_count, "like": like})
