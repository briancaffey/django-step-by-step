import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  role: string;
}

export interface Messages {
  messages: Message[];
  session_id: number;
}

export interface ChatResponse {
  messages: Message[];
}

export interface SendMessageResponse {
  id: number;
  content: string;
  timestamp: string;
  role: string;
}

export interface Session {
  session_id: number;
  created_at: string;
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatSessions: [] as any[],
    messagesData: { messages: [], session_id: 0 } as Messages,
    messageText: '',
    sessions: [] as Session[],
    loadingMessages: false,
    errorLoadingMessages: false,
    systemPrompt: 'You are a helpful assistant'
  }),

  actions: {
    setChatSessions(chatSessions: []) {
      this.chatSessions = chatSessions;
    },

    async fetchMessages(chatId: number): Promise<[Error | null, Messages | null]> {
      try {
        const apiBase = useNuxtApp().$apiBase;
        const response = await $fetch<{messages: Message[], session_id: number}>(`${apiBase}/api/chat/sessions/${chatId.toString()}/messages/`);
        return [null, response];
      } catch (error: any) {
        console.error('Error fetching messages:', error);
        return [error, null];
      }
    },

    async getMessages(sessionId: number): Promise<void> {
      this.loadingMessages = true;
      const [error, data] = await this.fetchMessages(sessionId);
      this.loadingMessages = false;

      if (error) {
        this.errorLoadingMessages = true;
        console.error(error);
        return;
      }

      if (data) {
        this.messagesData.messages = data.messages;
      }
    },

    async sendNewMessage(chatId: number, content: string): Promise<[Error | null, Message | null]> {
      try {
        const apiBase = useNuxtApp().$apiBase;
        const response = await $fetch<SendMessageResponse>(`${apiBase}/api/chat/sessions/${chatId}/messages/send/`, {
          method: 'POST',
          body: { content }
        });
        return [null, response];
      } catch (error: any) {
        console.error('Error sending message:', error);
        return [error, null];
      }
    },

    async sendMessage(content: string, sessionId: number): Promise<void> {
      const currentTime = Math.floor(Date.now() / 1000).toString();

      // Ensure messages array exists
      if (!this.messagesData.messages) {
        this.messagesData.messages = [];
      }

      // Add user message
      const userMessage: Message = {
        id: this.messagesData.messages.length + 1,
        content,
        timestamp: currentTime,
        role: 'user'
      };

      this.messagesData.messages.push(userMessage);

      const [error, data] = await this.sendNewMessage(sessionId, content);

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        this.messagesData = {
          ...this.messagesData,
          messages: [...this.messagesData.messages, data]
        };
      }
    },

    async fetchSessions(): Promise<[Error | null, Session[] | null]> {
      try {
        const apiBase = useNuxtApp().$apiBase;
        const response = await $fetch<{ sessions: Session[] }>(`${apiBase}/api/chat/get-sessions/`);
        return [null, response.sessions];
      } catch (error: any) {
        console.error('Error fetching sessions:', error);
        return [error, null];
      }
    },

    async getSessions(): Promise<void> {
      const [error, data] = await this.fetchSessions();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        this.sessions = data;
      }
    },

    async newSession(): Promise<void> {
      const router = useRouter();
      try {
        const apiBase = useNuxtApp().$apiBase;
        const response = await $fetch<{ session_id: number, message: string }>(`${apiBase}/api/chat/sessions/`, {
          method: 'POST',
          body: { system_prompt: this.systemPrompt }
        });

        navigateTo({ path: `/chat/${response.session_id}`});

        // this.sessions.push({ session_id: response.session_id, created_at: new Date().toISOString() });
      } catch (error: any) {
        console.error('Error creating new session:', error);
      }
    }
  }
});
