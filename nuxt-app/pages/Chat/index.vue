<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Use the composable to fetch chat sessions
const chatStore = await useChatStore();
const router = useRouter();

export interface Session {
  session_id: number;
  created_at: string;
}

// Reactive reference for session data
const chatSessions = ref<Session[]>([]);

async function loadSessions() {
  try {
    await chatStore.getSessions();
  } catch (error) {
    console.error('Error loading sessions:', error)
  }
}

// Load chat sessions on mount
onMounted(() => {
  loadSessions();
  console.log('Fetched sessions:', chatStore.chatSessions.value);
  // chatStore.chatSessions.value = sessions; // Ensure reactivity
});

// Navigate to the selected chat session
const goToChat = (sessionId: number) => {
  router.push(`/chat/${sessionId}`);
};
</script>

<template>
    <h1 class="text-2xl font-bold mb-6">Chat Sessions</h1>
    <Table class="w-full border rounded-lg shadow-md">
      <TableCaption class="text-gray-600">List of your chat sessions</TableCaption>

      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="p-3 text-left font-semibold">Session ID</TableHead>
          <TableHead class="p-3 text-left font-semibold">Created At</TableHead>
          <TableHead class="p-3 text-left font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody v-if="!!chatStore.sessions">
        <TableRow
          v-for="session in chatStore.sessions"
          :key="session.session_id"
          class="hover:bg-gray-50 transition-all"
        >
          <TableCell class="p-3">{{ session.session_id }}</TableCell>
          <TableCell class="p-3">{{ new Date(session.created_at).toLocaleString() }}</TableCell>
          <TableCell class="p-3">
            <button
              @click="goToChat(session.session_id)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              View Chat {{ session.session_id }}
            </button>
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody v-else>
        <TableRow>
          <TableCell class="p-3 text-center text-gray-500" colspan="3">
            No chat sessions available.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
