from django.urls import path
from . import views

urlpatterns = [
    path('sessions/', views.create_chat_session, name='create_chat_session'),
    path('sessions/<int:session_id>/messages/', views.get_chat_messages, name='get_chat_messages'),
    path('sessions/<int:session_id>/messages/send/', views.send_message, name='send_message'),
]
