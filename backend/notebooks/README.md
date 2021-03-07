# Example usage

```py
%env DJANGO_ALLOW_ASYNC_UNSAFE=true
from django.contrib.auth import get_user_model
User = get_user_model()
users = User.objects.all()
users.count()
```
