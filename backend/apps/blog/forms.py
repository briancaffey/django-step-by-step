from django.forms import ModelForm, CharField, Textarea

from apps.blog.models import Post


class PostForm(ModelForm):

    body = CharField(
        widget=Textarea(
            attrs={
                "class": "form-control",
                "placeholder": "Write your post here",
                "id": "email",
                "rows": 5,
                "autofocus": True,
                "type": "email",
            }
        )
    )

    class Meta:
        model = Post
        fields = ["body"]
