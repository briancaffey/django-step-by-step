from django.forms import (
    ModelForm,
    CharField,
    Textarea,
    ImageField,
    FileInput,
)

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

    image = ImageField(
        required=False,
        widget=FileInput(
            attrs={
                # add the bootstrap class in the form
                "class": "form-control",
                "data-cy": "file-input",
            }
        ),
    )

    class Meta:
        model = Post
        fields = ["body", "image"]
