# class_based_views.py
import logging

from django.contrib import messages
from django.contrib.auth.mixins import (
    UserPassesTestMixin,
)
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from django.urls import reverse, reverse_lazy
from django.views.generic import DetailView, ListView
from django.views.generic.edit import FormView, UpdateView, DeleteView

from apps.blog.forms import PostForm
from apps.blog.models import Post
from apps.core import constants as c

logger = logging.getLogger(__name__)


class PostUpdateView(UserPassesTestMixin, UpdateView):
    model = Post
    template_name = "blog/post_edit.html"
    form_class = PostForm

    def test_func(self):
        """
        Check to see if the user trying to update the post is the
        user that created the post
        """
        post = get_object_or_404(Post, id=self.kwargs["pk"])
        return self.request.user == post.created_by

    def form_valid(self, form):
        # TODO: move to get_success_message
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "Your post was updated!",
            extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
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
            extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
        )
        return HttpResponseRedirect(self.get_success_url(post_id=post.id))


class PostDetailView(DetailView):
    def get_object(self):
        try:
            post = Post.objects.with_like_info(user=self.request.user).get(
                pk=self.kwargs["pk"]
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
        posts = Post.objects.with_like_info(user=self.request.user)

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


class PostDeleteView(DeleteView):
    model = Post

    def get_object(self):
        try:
            post = Post.objects.with_like_info(user=self.request.user).get(
                pk=self.kwargs["pk"]
            )
            return post
        except Post.DoesNotExist:
            raise Http404()

    def get_success_url(self):
        messages.add_message(
            self.request,
            messages.SUCCESS,
            "Your post was deleted",
            extra_tags=c.BOOTSTRAP_ALERT_SUCCESS,
        )
        return reverse_lazy("post-list-cbv")
