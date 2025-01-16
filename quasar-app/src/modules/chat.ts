import { ref } from 'vue';
import { apiService } from '../classes';

import { Messages } from '../types';

export function useMessages() {

  // define the variable to hold messages in a chat session
  const messages = ref<Messages>({ messages: [], session_id: 0 });
  // for the input field
  const messageText = ref('');
  // loading state
  const loadingMessages = ref(false);
  const errorLoadingMessages = ref(false);

  // get all messages for a given chat session
  const getMessages = async (sessionId: number): Promise<void> => {
    loadingMessages.value = true;
    const [error, data] = await apiService.fetchMessages(sessionId);
    loadingMessages.value = false;

    if (error) {
      errorLoadingMessages.value = true;
      console.error(error);
      return;
    }

    if (data) {
      messages.value = data;
    }
  };

  const sendMessage = async (content: string, sessionId: number): Promise<void> => {
    const currentTime = '12345'; // TODO: fix dummy timestamp
    messages.value.messages.push({id: 1, content, timestamp: currentTime, role: 'user'})
    const [error, data] = await apiService.sendNewMessage(sessionId, content);

    if (error) {
      console.error(error);
      // TODO: handle error
      return;
    }

    if (data) {
      messages.value.messages.push(data);
    }
  };

  return {
    messageText,
    messages,
    loadingMessages,
    errorLoadingMessages,
    getMessages,
    sendMessage,
  };
}
