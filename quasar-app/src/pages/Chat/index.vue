<template>
  <q-page padding>
    <div class="chat-container">

      <div v-for="(message, i) in messages.messages" :key="i">
        <q-chat-message :text="[message.content]" :sent="message.role == 'user'" ref="messagesContainer">
        </q-chat-message> {{ message }}
      </div>

      <q-input
        v-model="messageText"
        filled
        autogrow
        @keyup.enter="sendMessageFunction"
      >
        <template v-slot:after>
          <q-btn
            color="purple"
            label="Send"
            :disable="!messageText.trim()"
            @click="sendMessageFunction"
          />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { defineComponent, ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { sendNewMessage } from
import { Message, ChatResponse } from 'src/types';
import { apiService } from 'src/classes';

// import module
import { useMessages } from '../../modules/chat';
//

export default defineComponent({
  name: 'ChatComponent',

  setup() {
    const {
      messageText,
      messages,
      loadingMessages,
      errorLoadingMessages,
      getMessages,
      sendMessage,
    } = useMessages();

    // router
    const route = useRoute();
    // const chatId = route.params.chatId as string;

    const messagesContainer = ref<HTMLElement | null>(null);

    // Get chat ID from URL parameter
    const chatId = computed(() => route.params.chatId as string);
    console.log('chatId', chatId.value);

    // Function to scroll to bottom of messages
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    // Load initial messages
    onMounted(async () => {
      const [error, fetchedMessages] = await apiService.fetchMessages(Number(chatId.value));
      if (fetchedMessages) {
        messages.value = fetchedMessages;
        nextTick(scrollToBottom);
      }
      nextTick(scrollToBottom);
    });

    // Watch messages for changes and scroll to bottom
    watch(messages, () => {
      nextTick(scrollToBottom);
    });

    // Handle sending message
    const sendMessageFunction = async () => {
      console.log('Sending a new message');
      if (!messageText.value.trim()) return;
      console.log('Message text is valid');
      messages.value.messages.push({content: messageText.value, id: -1, timestamp: '123', role: 'user'})

      const [error, newMessage] = await apiService.sendNewMessage(Number(chatId.value), messageText.value);

      if (newMessage) {
        console.log(newMessage);
        messages.value.messages.push(newMessage);
        messageText.value = ''; // Clear input after successful send
      }
    };

    return {
      messageText,
      messages,
      sendMessage,
      messagesContainer,
      chatId,
      sendMessageFunction
    };
  },
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  gap: 1rem;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
