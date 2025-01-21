<template>
  <div class="chat-page h-screen flex flex-col">
    <div ref="chatContainer" class="chat-container flex-1 overflow-y-auto p-4 space-y-2">
      <div
        v-for="message in chatStore.messagesData.messages"
        :key="message.id"
        :class="{
          'self-end bg-blue-100 max-w-1/2': message.role === 'user',
          'self-start bg-gray-100 max-w-1/2': message.role !== 'user'
        }"
        class="message p-3 rounded-lg break-words shadow-md"
      >
        <div class="message-content" v-html="renderedMarkdown(message.content)"></div>

      </div>
    </div>

    <!-- Chat input section -->
    <div class="sticky bottom-0 w-full bg-white border-t border-gray-300 p-4 shadow-md">
      <div class="flex items-center space-x-2">
        <textarea
          v-model="chatStore.messageText"
          class="w-full p-3 border rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          @keydown.enter.exact.prevent="handleSendMessage"
          placeholder="Type your message..."
          style="max-height: 20rem; overflow-y: auto;"
        ></textarea>
        <button
          @click="handleSendMessage"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/chatStore';
import { marked } from 'marked'

const route = useRoute();
const chatId = route.params.id;
const sessionId = chatId;
const chatContainer = ref(null);

const chatStore = useChatStore();

// Function to send message and clear input
const handleSendMessage = async () => {
  if (chatStore.messageText.trim() === '') return;

  await chatStore.sendMessage(chatStore.messageText, sessionId);
  chatStore.messageText = '';

  // Scroll to bottom after sending message
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

async function loadMessages() {
  try {
    await chatStore.getMessages(Number(chatId));
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

const renderedMarkdown = (content) => {
  return marked.parse(content)
}

onMounted(() => {
  loadMessages();
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
}
</style>
