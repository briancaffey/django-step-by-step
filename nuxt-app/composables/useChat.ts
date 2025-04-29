import { ref } from 'vue';


export const useChatComposable = async () => {

  // define the variable to hold messages in a chat session
  const messages = ref<Messages>({ messages: [], session_id: 0 });
  // for the input field
  const messageText = ref('');

  // sessions
  const sessions = ref<Session[]>([]);

  // loading state
  const loadingMessages = ref(false);
  const errorLoadingMessages = ref(false);
  const fetchMessages = async (chatId: number): Promise<[Error | null, Messages | null]> => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch<{messages: Messages, session_id: number}>(`${config.public.apiBase}/api/chat/sessions/${chatId.toString()}/messages/`);
      return [null, response.messages];
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      return [error, null];
    }
  };

  // get all messages for a given chat session
  const getMessages = async (sessionId: number): Promise<void> => {
    loadingMessages.value = true;
    const [error, data] = await fetchMessages(sessionId);
    loadingMessages.value = false;

    if (error) {
      errorLoadingMessages.value = true;
      console.error(error);
      return;
    }

    if (data) {
      messages.value.messages = data.messages;
    }
  };

  // chat
  const sendNewMessage = async (chatId: number, content: any): Promise<[Error | null, Message | null]> => {
    const apiBase = useNuxtApp().$apiBase;
    try {
      const response = await $fetch<SendMessageResponse>(`${apiBase}/api/chat/sessions/${chatId}/messages/send/`, {
        method: 'POST', body: {
          content,
        }
      });
      return [null, response];
    } catch (error: any) {
      console.error('Error sending message:', error);
      return [error, null];
    }
  };


  const sendMessage = async (content: string, sessionId: number): Promise<void> => {
    const currentTime = Math.floor(Date.now() / 1000).toString();
    console.log(messages);

    messages.value.messages.push({id: sessionId, content, timestamp: currentTime, role: 'user'})
    const [error, data] = await sendNewMessage(sessionId, content);

    if (error) {
      console.error(error);
      // TODO: handle error
      return;
    }

    if (data) {
      console.log('there is data');
      messages.value.messages.push(data);
    }
  };

  // function for getting sessions
  const fetchSessions = async (): Promise<[Error | null, Session[] | null]> => {
    try {
      const apiBase = useNuxtApp().$apiBase;
      const response = await $fetch<{ sessions: Session[] }>(`${apiBase}/api/chat/get-sessions/`);
      return [null, response.sessions];
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      return [error, null];
    }
  };

  const getSessions = async (): Promise<void> => {
    const [error, data] = await fetchSessions();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      sessions.value = data;
    }
  };

  return {
    messageText,
    messages,
    loadingMessages,
    errorLoadingMessages,
    getMessages,
    sendMessage,
    sessions,
    getSessions,
  };
}
