<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="border-b">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-xl font-semibold">App</h1>
        <NavigationMenu class="flex space-x-4">
          <!-- <DarkMode /> -->

          <NuxtLink
            key="Home"
            to="/"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/') }"
          >
            Home
          </NuxtLink>

          <NuxtLink
            v-if="getIsAuthenticated && isProfileComplete"
            key="Chat"
            to="/chat"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/chat') }"
          >
            Chat
          </NuxtLink>

          <NuxtLink
            v-if="getIsAuthenticated"
            key="Profile"
            to="/profile"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/profile') }"
          >
            Profile
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

          <NuxtLink
            v-if="!getIsAuthenticated"
            key="Sign Up"
            to="/signup"
            class="text-sm font-medium transition"
            :class="{ 'text-blue-600': isActive('/signup') }"
          >
            Sign Up
          </NuxtLink>

          <Popover v-if="authStore.getIsAuthenticated">
            <PopoverTrigger class="text-sm font-medium transition">Logout</PopoverTrigger>
            <PopoverContent class="p-2 w-auto">
            <NuxtLink>
              <Button @click="logout">Logout</Button>
            </NuxtLink>
          </PopoverContent>
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

import { Button } from '@/components/ui/button'

import { DarkMode } from '#components';

import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';

const authStore = useAuthStore();
const {getIsAuthenticated} = storeToRefs(authStore);

const profileStore = useProfileStore();
const { isProfileComplete } = storeToRefs(profileStore);

const route = useRoute()
const router = useRouter()
const isActive = (path) => route.path === path

const logout = async () => {
  try {
    await $fetch('http://localhost/api/auth/jwt/token/logout/', {method: 'POST', credentials: 'include'});
    authStore.setAuthenticated(false);
    router.push('/login')

  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>
