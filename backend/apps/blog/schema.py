from django.contrib.auth import get_user_model

import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload

from apps.accounts.schema import UserType
from apps.blog.models import Post, PostLike

from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator


User = get_user_model()


# https://gist.github.com/mbrochh/f92594ab8188393bd83c892ef2af25e6
def get_paginator(qs, page_size, page, paginated_type, **kwargs):
    p = Paginator(qs, page_size)
    try:
        page_obj = p.page(page)
    except PageNotAnInteger:
        page_obj = p.page(1)
    except EmptyPage:
        page_obj = p.page(p.num_pages)
    return paginated_type(
        count=qs.count(),
        page=page_obj.number,
        pages=p.num_pages,
        has_next=page_obj.has_next(),
        has_prev=page_obj.has_previous(),
        objects=page_obj.object_list,
        **kwargs
    )


class PostType(DjangoObjectType):
    class Meta:
        model = Post

    like_count = graphene.Int()
    liked = graphene.Boolean()

    def resolve_like_count(self, info):
        return getattr(self, "like_count", None)

    def resolve_liked(self, info):
        return getattr(self, "liked", None)


class PostPaginatedType(graphene.ObjectType):
    """
    The type that contains a list of posts and page information
    including page count
    """

    count = graphene.Int()
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(PostType)


class PostLikeType(DjangoObjectType):
    class Meta:
        model = PostLike


class Query(graphene.ObjectType):
    post = graphene.Field(PostType, post_id=graphene.Int(required=True))

    paginated_posts = graphene.Field(
        PostPaginatedType,
        page=graphene.Int(),
        page_size=graphene.Int(),
        by_creator_id=graphene.Int(),
        search=graphene.String(),
    )

    # Now, in your resolver functions, you just query your objects and
    # turn thequeryset into the PaginatedType using the helper function:
    def resolve_paginated_posts(
        self,
        info,
        page=None,
        page_size=None,
        by_creator_id=None,
        search=None,
        **kwargs
    ):
        posts = Post.objects.with_like_info(user=info.context.user)

        if search:
            posts = posts.filter(body__icontains=search)

        if by_creator_id:
            posts = posts.filter(created_by_id=by_creator_id)

        if page_size is None:
            page_size = 10

        if page is None:
            page = 1

        return get_paginator(posts, page_size, page, PostPaginatedType)

    def resolve_post(self, info, post_id=None, **kwargs):
        if post_id is None:
            raise Exception("No post ID provided")

        try:
            post = Post.objects.with_like_info(user=info.context.user).get(
                id=post_id
            )
        except Post.DoesNotExist:
            raise Exception("No such post")

        return post


class CreatePost(graphene.Mutation):
    id = graphene.Int()
    body = graphene.String()
    created_by = graphene.Field(UserType)

    class Arguments:
        body = graphene.String()
        file = Upload(required=False)

    def mutate(self, info, body, file):
        user = info.context.user
        if user.is_anonymous:
            user = None
        post = Post(body=body, created_by=user)
        if file is not None:
            post.image = file
        post.save()

        return CreatePost(
            id=post.id,
            body=post.body,
            created_by=post.created_by,
        )


class UpdatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.Int()
        body = graphene.String()

    def mutate(self, info, post_id, body):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Must be logged in to update a post.")

        post = (
            Post.objects.with_like_info(user=user).filter(id=post_id).first()
        )

        if not post:
            raise Exception("No such post")

        if post.created_by != user:
            raise Exception("You cannot update this post.")

        post.body = body
        post.save()

        return UpdatePost(
            post=post,
        )


class DeletePost(graphene.Mutation):
    post_id = graphene.Int()
    ok = graphene.Boolean()

    class Arguments:
        post_id = graphene.Int()

    def mutate(self, info, post_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Must be logged in to delete a post.")

        post = Post.objects.filter(id=post_id).first()

        if not post:
            raise Exception("No such post")

        if post.created_by != user:
            raise Exception("You cannot delete this post.")

        post.delete()

        return DeletePost(
            ok=True,
        )


class TogglePostLike(graphene.Mutation):
    user = graphene.Field(UserType)
    post = graphene.Field(PostType)
    # like count after user likes or unlikes a post
    like_count = graphene.Int()
    # if the user does or does not like the post
    liked = graphene.Boolean()

    class Arguments:
        post_id = graphene.Int()

    def mutate(self, info, post_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Must be logged in to like a post")

        post = (
            Post.objects.with_like_info(user=user).filter(id=post_id).first()
        )

        if not post:
            raise Exception("Invalid post")

        if user not in post.likes.all():
            post_like_through_model = PostLike(post=post, liked_by=user)
            post_like_through_model.save()

        else:
            post.likes.remove(user)

        # make sure we are using an updated version of the post with update
        # like info, so simply make the query again
        post = (
            Post.objects.with_like_info(user=user).filter(id=post_id).first()
        )

        return TogglePostLike(
            user=user,
            post=post,
        )


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()
    toggle_post_like = TogglePostLike.Field()
