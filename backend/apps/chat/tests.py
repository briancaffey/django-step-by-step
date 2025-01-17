import pytest
from apps.accounts.models import CustomUser
from django.conf import settings
from rest_framework.test import APIClient
from rest_framework import status
from apps.chat.models import ChatSession, Message

User = CustomUser

@pytest.fixture
def create_user(db):
    """
    Fixture to create a test user.
    """
    user = User.objects.create_user(email="a@b.co", password="testpassword")
    return user

@pytest.fixture
def api_client():
    """
    Fixture to create an API client.
    """
    return APIClient()

@pytest.fixture
def authenticated_client(api_client, create_user):
    """
    Fixture to create an authenticated client.
    """
    api_client.login(email="a@b.co", password="testpassword")
    return api_client

def test_create_chat_session(authenticated_client, create_user):
    """
    Test creating a new chat session.
    """
    response = authenticated_client.post("/api/chat/sessions/", {"system_prompt": "Hello! How can I help you?"})
    assert response.status_code == status.HTTP_201_CREATED
    assert "session_id" in response.data

    # Verify ChatSession and Message objects
    session_id = response.data["session_id"]
    chat_session = ChatSession.objects.get(id=session_id)
    assert chat_session.user == create_user
    assert chat_session.messages.count() == 1
    assert chat_session.messages.first().content == "Hello! How can I help you?"

def test_get_chat_messages(authenticated_client, create_user):
    """
    Test retrieving all messages for a chat session.
    """
    chat_session = ChatSession.objects.create(user=create_user)
    Message.objects.create(chat_session=chat_session, role="assistant", content="Hello!")
    Message.objects.create(chat_session=chat_session, role="user", content="Hi there!")

    response = authenticated_client.get(f"/api/chat/sessions/{chat_session.id}/messages/")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data["messages"]) == 2
    assert response.data["messages"][0]["content"] == "Hello!"
    assert response.data["messages"][1]["content"] == "Hi there!"

def test_send_message(authenticated_client, create_user):
    """
    Test sending a new message to a chat session.
    """
    chat_session = ChatSession.objects.create(user=create_user)

    response = authenticated_client.post(f"/api/chat/sessions/{chat_session.id}/messages/send/", {"content": "How are you?"})
    print(response)
    assert response.status_code == status.HTTP_201_CREATED
    assert "message_id" in response.data

    # Verify Message object
    message_id = response.data["message_id"]
    message = Message.objects.get(id=message_id)
    assert message.content == "How are you?"
    assert message.role == "user"
    assert message.chat_session == chat_session

def test_send_message_to_unauthorized_session(authenticated_client):
    """
    Test sending a message to a chat session that does not belong to the user.
    """
    other_user = User.objects.create_user(email="b@d.co", password="otherpassword")
    chat_session = ChatSession.objects.create(user=other_user)

    response = authenticated_client.post(f"/api/chat/sessions/{chat_session.id}/messages/send/", {"content": "Hello?"})
    assert response.status_code == status.HTTP_404_NOT_FOUND

def test_get_messages_from_unauthorized_session(authenticated_client):
    """
    Test retrieving messages from a chat session that does not belong to the user.
    """
    other_user = User.objects.create_user(email="b@d.co", password="otherpassword")
    chat_session = ChatSession.objects.create(user=other_user)
    Message.objects.create(chat_session=chat_session, role="assistant", content="Hello!")

    response = authenticated_client.get(f"/api/chat/sessions/{chat_session.id}/messages/")
    assert response.status_code == status.HTTP_404_NOT_FOUND

# write a test for the get_chat_messages function using pytest

def test_chat_sessions(authenticated_client):
    """
    Test retrieving all chat sessions for the current user.
    """
    response = authenticated_client.get("/api/chat/get-sessions/")
    assert response.status_code == status.HTTP_200_OK
    assert "sessions" in response.data

    # Verify ChatSession objects
    chat_sessions = ChatSession.objects.filter(user=authenticated_client.user)
    assert len(response.data["sessions"]) == chat_sessions.count()
    for i, session in enumerate(chat_sessions):
        assert response.data["sessions"][i]["session_id"] == session.id
        assert response.data["sessions"][i]["created_at"] == session.created_at
