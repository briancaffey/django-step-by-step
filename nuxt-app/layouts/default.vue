<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="border-b">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-xl font-semibold">My Nuxt App</h1>
        <NavigationMenu class="flex space-x-4">
          <DarkMode />

          <NuxtLink
            key="Home"
            to="/"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/') }"
          >
            Home
          </NuxtLink>

          <NuxtLink
            key="Chat"
            to="/chat"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/chat') }"
          >
            Chat
          </NuxtLink>

          <NuxtLink
            v-if="!getIsAuthenticated"
            key="Login"
            to="/login"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/login') }"
          >
            Login
          </NuxtLink>
          <Popover v-if="authStore.getIsAuthenticated">
            <PopoverTrigger>Logout</PopoverTrigger>
            <PopoverContent><Button @click="logout">Logout</Button></PopoverContent>
          </Popover>
        </NavigationMenu>
      </div>
    </nav>
    <!-- Page Content -->
    <main class="container mx-auto px-6 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DarkMode } from '#components';

import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const {getIsAuthenticated} = storeToRefs(authStore);

const route = useRoute()
const isActive = (path) => route.path === path

const logout = async () => {
  try {
    await $fetch.post('/api/auth/jwt/token/logout/');

  } catch (error) {
    console.error('Logout failed:', error);
  }
  authStore.setAuthenticated(false);
};
</script>
