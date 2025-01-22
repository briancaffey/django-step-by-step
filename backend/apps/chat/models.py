from django.contrib.auth.models import User
from django.db import models
from django.conf import settings


class ChatSession(models.Model):
    """
    Represents a chat session between a user and the LLM.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="chat_sessions"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatSession {self.id} for {self.user.username}"


class Message(models.Model):
    """
    Represents a message exchanged in a chat session.
    """

    ROLE_CHOICES = (
        ("user", "User"),
        ("assistant", "Assistant"),
    )

    chat_session = models.ForeignKey(
        ChatSession, on_delete=models.CASCADE, related_name="messages"
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role.capitalize()} message in Session {self.chat_session.id} at {self.timestamp}"
