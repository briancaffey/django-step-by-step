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

// import button component from shadcn
import { Button } from '@/components/ui/button';
// Use the composable to fetch chat sessions
const pinia = usePinia();
const chatStore = await useChatStore(pinia);
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
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Chat Sessions</h1>
      <Button @click="chatStore.newSession" class="">New Chat Session</Button>
    </div>
    <Table class="w-full border rounded-lg shadow-md">
      <TableCaption>List of your chat sessions</TableCaption>

      <TableHeader>
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
          class="transition-all"
        >
          <TableCell class="p-3">{{ session.session_id }}</TableCell>
          <TableCell class="p-3">{{ new Date(session.created_at).toLocaleString() }}</TableCell>
          <TableCell class="p-3">
            <button
              @click="goToChat(session.session_id)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg transition-all"
            >
              View Chat {{ session.session_id }}
            </button>
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody v-else>
        <TableRow>
          <TableCell class="p-3 text-center" colspan="3">
            No chat sessions available.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
