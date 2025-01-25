<template>
  <div class="chat-page h-screen flex flex-col">
    <div ref="chatContainer" class="chat-container flex-1 overflow-y-auto p-4 space-y-2">
      <Card
        v-for="message in chatStore.messagesData.messages"
        :key="message.id"
        :class="{
          'self-end max-w-1/2': message.role === 'user',
          'self-start max-w-1/2': message.role !== 'user'
        }"
        class="message p-3 rounded-lg break-words"
      >
        <div v-html="renderedMarkdown(message.content)"></div>

      </Card>
    </div>

    <!-- Chat input section -->
    <div class="sticky bottom-0 w-full p-4">
      <div class="flex items-center space-x-2">
        <Textarea
          v-model="chatStore.messageText"
          class="bg-background"
          @keydown.enter.exact.prevent="handleSendMessage"
          placeholder="Type your message..."
         />
        <Button
          @click="handleSendMessage"
        >
          Send
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import { ref, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/chatStore';
import { marked } from 'marked'

const route = useRoute();
const chatId = route.params.id;
const sessionId = chatId;
const chatContainer = ref(null);

const pinia = usePinia();
const chatStore = useChatStore(pinia);

// Function to send message and clear input
const handleSendMessage = async () => {
  console.log('handleSendMessage')

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

<style>
</style>
