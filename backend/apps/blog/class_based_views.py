# class_based_views.py
import logging

from django.contrib import messages
from django.contrib.auth.mixins import (
    PermissionRequiredMixin,
    UserPassesTestMixin,
)
from django.core.paginator import Paginator
from django.db.models import Count, Exists, OuterRef
from django.http import HttpResponseRedirect, HttpResponseNotFound, Http404
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views.generic import DetailView, ListView
from django.views.generic.edit import FormView, UpdateView, DeleteView

from apps.blog.forms import PostForm
from apps.blog.models import Post, PostLike

logger = logging.getLogger(__name__)


class PostUpdateView(UserPassesTestMixin, UpdateView):
    model = Post
    template_name = "blog/post_edit.html"
    form_class = PostForm

    def test_func(self):
        post = get_object_or_404(Post, id=self.kwargs["pk"])
        return self.request.user == post.created_by

    def form_valid(self, form):
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "Your post was updated!",
            extra_tags="alert alert-success",
        )
        return super().form_valid(form)

    def get_success_url(self):
        return reverse("post-detail-cbv", kwargs={"pk": self.kwargs["pk"]})


class PostCreateView(FormView):
    template_name = "blog/post_create.html"
    form_class = PostForm

    def get_success_url(self, **kwargs):
        post_id = kwargs["post_id"]
        return reverse("post-detail-cbv", kwargs={"pk": post_id})

    def form_valid(self, form):
        post = form.save()
        if self.request.user.is_authenticated:
            post.created_by = self.request.user
            post.save()
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "Your post was created!",
            extra_tags="alert alert-success",
        )
        return HttpResponseRedirect(self.get_success_url(post_id=post.id))


class PostDetailView(DetailView):
    def get_object(self):
        logger.info("in get_object..")
        try:
            post = (
                Post.objects.prefetch_related("created_by")
                .annotate(
                    like_count=Count("likes"),
                    liked=Exists(
                        PostLike.objects.filter(
                            liked_by_id=self.request.user.pk,
                            post=OuterRef("pk"),
                        )
                    ),
                )
                .get(pk=self.kwargs["pk"])
            )

            return post
        except Post.DoesNotExist:
            raise Http404()

    def get_context_data(self, **kwargs):
        post = self.get_object()
        return {"post": post}


class PostListView(ListView):
    def get_queryset(self):
        """
        Get the list of posts and filter posts by search query if it is present
        """
        posts = (
            Post.objects.all()
            .prefetch_related("created_by")
            .annotate(
                like_count=Count("likes"),
                # see if the request.user liked the post
                liked=Exists(
                    PostLike.objects.filter(
                        liked_by_id=self.request.user.id or None,
                        post=OuterRef("id"),
                    )
                ),
            )
        ).order_by("-modified_on")

        if self.request.GET.get("q"):
            search_query = self.request.GET.get("q")
            posts = posts.filter(body__icontains=search_query)

        return posts

    def get_context_data(self):
        """
        Do pagination here and any other context data for the posts list page
        """
        posts = self.get_queryset()
        paginator = Paginator(posts, 10)
        page_number = self.request.GET.get("page")
        page_obj = paginator.get_page(page_number)

        return {"page_obj": page_obj}
