from django.contrib import admin
from .models import ChatSession, Message

class MessageInline(admin.TabularInline):
    """
    Inline for displaying messages within a chat session in the admin interface.
    """
    model = Message
    extra = 0  # Do not show extra blank rows
    fields = ('role', 'content', 'timestamp')
    readonly_fields = ('role', 'content', 'timestamp')
    ordering = ('timestamp',)

class ChatSessionAdmin(admin.ModelAdmin):
    """
    Admin configuration for ChatSession.
    """
    list_display = ('id', 'user', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__username', 'id')
    ordering = ('-created_at',)
    inlines = [MessageInline]

class MessageAdmin(admin.ModelAdmin):
    """
    Admin configuration for Message.
    """
    list_display = ('id', 'role', 'timestamp')
    list_filter = ('role', 'timestamp')
    search_fields = ('content', 'role')
    ordering = ('-timestamp',)

admin.site.register(ChatSession, ChatSessionAdmin)
admin.site.register(Message, MessageAdmin)
