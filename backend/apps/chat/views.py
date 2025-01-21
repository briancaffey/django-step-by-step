"""
Views for:

- creating a new ChatSession (the user must be logged in). This should basically just set the system prompt
- getting all chat messages and associated data for a chat session
- sending a new message to a ChatSession (the user needs to be logged in and the user can only send messages to a ChatSession that is owned by the same user)
"""

import os

from llama_index.llms.openai import OpenAI
from llama_index.llms.nvidia import NVIDIA
from llama_index.core.llms import ChatMessage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ChatSession, Message

# from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat_session(request):
    """
    Create a new ChatSession. Sets a system prompt.
    """
    system_prompt = request.data.get('system_prompt', 'Default system prompt.')

    # Create the chat session
    chat_session = ChatSession.objects.create(user=request.user)

    # Save the initial system message
    Message.objects.create(
        chat_session=chat_session,
        role='assistant',
        content=system_prompt
    )

    return Response({
        'message': 'Chat session created successfully.',
        'session_id': chat_session.id,
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_messages(request, session_id):
    """
    Retrieve all messages and associated data for a specific chat session.
    """
    try:
        chat_session = ChatSession.objects.get(id=session_id, user=request.user)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Chat session not found or not owned by user.'}, status=status.HTTP_404_NOT_FOUND)

    messages = chat_session.messages.all().order_by('timestamp')
    response_data = [
        {
            'role': message.role,
            'content': message.content,
            'timestamp': message.timestamp
        } for message in messages
    ]

    return Response({
        'session_id': chat_session.id,
        'messages': response_data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request, session_id):
    """
    Send a new message to a specific chat session.
    """
    print("Trying to send a message)")
    try:
        chat_session = ChatSession.objects.get(id=session_id, user=request.user)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Chat session not found or not owned by user.'}, status=status.HTTP_404_NOT_FOUND)

    content = request.data.get('content')
    if not content:
        return Response({'error': 'Message content is required.'}, status=status.HTTP_400_BAD_REQUEST)

    message = Message.objects.create(
        chat_session=chat_session,
        role='user',
        content=content
    )

    # get all messages for the chat session
    messages = chat_session.messages.all().order_by('timestamp')

    # format messages using LlamaIndex `ChatMessage` class
    messages = [ChatMessage(role=message.role, content=message.content) for message in messages]

    if os.environ.get("OPENAI_API_KEY", None):
        print("Using OpenAI")

        # LlamaIndex OpenAI
        llm = OpenAI(
            model="gpt-4o-mini",
        )

    elif os.environ.get("NVIDIA_API_KEY").startswith("nvapi-"):
        print("Using NVIDIA")
        llm = NVIDIA(model="meta/llama-3.3-70b-instruct")

        # use LlamaIndex to make a request to openAI using the message history
        resp = llm.chat(messages)

        print(resp)

        response_message = resp.message.content
    else:
        response_message = f"This is a mocked response for user query ({content})"

    # create a new Message object in the database with the response_message
    message = Message.objects.create(
        chat_session=chat_session,
        role='assistant',
        content=response_message
    )

    return Response({
        'message': 'Message sent successfully.',
        'message_id': message.id,
        'content': message.content,
        'timestamp': message.timestamp
    }, status=status.HTTP_201_CREATED)

# write a function using DRF called get_chat_sessions that gets the sessions for the current user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_sessions(request):
    """
    Retrieve all chat sessions for the current user.
    """
    chat_sessions = ChatSession.objects.filter(user=request.user)
    response_data = [
        {
            'session_id': session.id,
            'created_at': session.created_at
        } for session in chat_sessions
    ]

    return Response({
        'sessions': response_data
    }, status=status.HTTP_200_OK)
