<template>
  <q-page padding>
    <div class="chat-container">
      <!-- Messages display area -->
      <!-- <q-card class="messages-container" ref="messagesContainer">
        <div v-for="message in messages" :key="message.id" class="message">
          {{ message.content }}
        </div>
      </q-card> -->

      <div v-for="(message, i) in messages" :key="i">

        <q-chat-message :text="[message.content]" :sent="!!message.sender_id" ref="messagesContainer">
        </q-chat-message>
      </div>


      <!-- Input area -->
      <q-input
        v-model="messageText"
        filled
        autogrow
        @keyup.enter="sendMessage"
      >
        <template v-slot:after>
          <q-btn
            color="purple"
            label="Send"
            :disable="!messageText.trim()"
            @click="sendMessage"
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



import { defineComponent, ref, onMounted, watch, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
// import { sendNewMessage } from
import { Message, ChatResponse } from 'src/types';
import { apiService } from 'src/classes';
export default defineComponent({
  name: 'ChatComponent',

  setup() {
    const route = useRoute();
    const messageText = ref('');
    const messages = ref<Message[]>([]);
    const messagesContainer = ref<HTMLElement | null>(null);

    // Get chat ID from URL parameter
    const chatId = computed(() => route.params.chatId as string);

    // Function to scroll to bottom of messages
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    // Load initial messages
    onMounted(async () => {
      const [error, fetchedMessages] = await apiService.fetchMessages(chatId.value);
      if (fetchedMessages) {
        messages.value = fetchedMessages;
        nextTick(scrollToBottom);
      }
    });

    // Watch messages for changes and scroll to bottom
    watch(messages, () => {
      nextTick(scrollToBottom);
    });

    // Handle sending message
    const sendMessage = async () => {
      if (!messageText.value.trim()) return;

      const [error, newMessage] = await apiService.sendNewMessage(chatId.value, messageText.value);

      if (newMessage) {
        messages.value.push(newMessage);
        messageText.value = ''; // Clear input after successful send
      }
    };

    return {
      messageText,
      messages,
      sendMessage,
      messagesContainer,
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
