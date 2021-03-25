from django.forms import ModelForm, CharField, Textarea

from apps.blog.models import Post


class PostForm(ModelForm):

    body = CharField(widget=Textarea)

    class Meta:
        model = Post
        fields = ["body"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["body"].widget.attrs.update(
            {
                "class": "form-control",
                "placeholder": "Write your post here",
                "required": True,
                "maxlength": 200,
                "rows": 3,
                "id": "post-body",
            }
        )
