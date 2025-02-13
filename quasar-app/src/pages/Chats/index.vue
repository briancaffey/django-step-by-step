<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-card-title class="text-h4">
          Chat sessions
        </q-card-title>
      </q-card-section>
      <q-card-section>
        <div>
          <q-btn
            label="Create New Chat Session"
            color="secondary"
            @click="newChatSession"
            class="q-ma-sm"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-card-title class="text-h4">
          Your Chat sessions
        </q-card-title>
      </q-card-section>
      <q-card-section>
        <div v-for="(session, i) in sessions.sessions" :key="i">
          <q-btn
            :label="`Chat Session #${session.session_id}`"
            color="primary"
            @click="$router.push(`chat/${session.session_id}`)"
            class="q-ma-sm"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// TODO remove these
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { defineComponent, onMounted } from 'vue';
import { useMessages } from '../../modules/chat';
import { apiService } from 'src/classes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ChatsComponent',

  setup() {
    const $router = useRouter();
    const { sessions, getSessions } = useMessages();

    onMounted( async () => {
      await getSessions();
    });

    const newChatSession = async () => {
      const [error, newSession] = await apiService.createSession();
      if (error) {
        console.error(error);
      } else {
        $router.push(`chat/${newSession.session_id}`);
      }
    };

    return {
      sessions,
      getSessions,
      newChatSession,
    };
  },
});
</script>
