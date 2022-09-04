import logging


from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.decorators.http import require_POST


from apps.blog.models import Post, PostLike
from apps.blog.forms import PostForm
from apps.core import constants as c


logger = logging.getLogger()


def posts(request):

    posts = Post.objects.with_like_info(user=request.user)

    if request.GET.get("q"):
        search_query = request.GET.get("q")
        posts = posts.filter(body__icontains=search_query)
    paginator = Paginator(posts, 10)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(request, template_name="posts.html", context={"page_obj": page_obj})


def post(request, id):

    try:
        post = Post.objects.with_like_info(user=request.user).get(id=id)
    except Post.DoesNotExist:
        raise Http404("Post does not exist")

    return render(request, template_name="post.html", context={"post": post})


def new_post(request):

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)

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
                extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
            )
            return HttpResponseRedirect(reverse("post", kwargs={"id": post.id}))

    else:
        form = PostForm()

    return render(request, "new_post.html", {"form": form})


@login_required
def edit_post(request, id):

    # get the post by id
    instance = get_object_or_404(Post, id=id)

    # TODO: refactor this
    # a user cannot edit a post created anonymously
    if not instance.created_by:
        messages.add_message(
            request,
            messages.WARNING,
            "You cannot edit an anonymous post",
            extra_tags=c.BOOTSTRAP_ALERT_WARNING,
        )
        return HttpResponseRedirect(reverse("post", kwargs={"id": instance.id}))
    else:
        logger.info("here.")

    if request.method == "POST":

        if not request.user == instance.created_by:
            messages.add_message(
                request,
                messages.WARNING,
                "You cannot edit this post",
                extra_tags=c.BOOTSTRAP_ALERT_WARNING,
            )
            return HttpResponseRedirect(reverse("post", kwargs={"id": instance.id}))

        form = PostForm(request.POST or None, instance=instance)

        if form.is_valid():
            # process data
            post = form.save()
            messages.add_message(
                request,
                messages.SUCCESS,
                "Your post was updated!",
                extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
            )
            return HttpResponseRedirect(reverse("post", kwargs={"id": post.id}))

    else:
        post = get_object_or_404(Post, id=id)
        form = PostForm(instance=post)

    return render(request, "edit_post.html", {"form": form})


@login_required
@require_POST
def delete_post(request, id):

    instance = get_object_or_404(Post, id=id)

    if instance.created_by is None:
        messages.add_message(
            request,
            messages.WARNING,
            "You cannot delete an anonymous post",
            extra_tags=c.BOOTSTRAP_ALERT_WARNING,
        )
        return HttpResponseRedirect(reverse("post", kwargs={"id": instance.id}))

    # delete object
    instance.delete()
    messages.add_message(
        request,
        messages.WARNING,
        "Your post was deleted",
        extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
    )
    # after deleting redirect to post list
    return HttpResponseRedirect(reverse("list-posts"))


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
