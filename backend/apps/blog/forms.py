from django.forms import ModelForm, CharField, Textarea

from apps.blog.models import Post


class PostForm(ModelForm):

    body = CharField(
        widget=Textarea(
            attrs={
                "class": "form-control",
                "placeholder": "Write your post here",
                "id": "post-body",
                "rows": 5,
                "autofocus": True,
                "type": "text",
            }
        )
    )

    class Meta:
        model = Post
        fields = ["body"]
