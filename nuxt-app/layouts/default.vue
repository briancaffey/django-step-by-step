<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="border-b">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-xl font-semibold">
          <NuxtLink
            key="Home"
            to="/"
          >
            Appoij
          </NuxtLink>
        </h1>

        <div>
          <Button @click="toggleDark" variant="secondary" size="icon" class="rounded-full mx-4">
            <Icon
              :icon="colorMode.preference == 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <!-- <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> -->
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <NuxtLink
                v-if="getIsAuthenticated && isProfileComplete"
                key="Chat"
                to="/chat"
                class="text-sm font-medium transition"
                :class="{ 'text-blue-600': isActive('/chat') }"
              >
                <DropdownMenuItem style="cursor:pointer">
                  Chat
                </DropdownMenuItem>
              </NuxtLink>
            <NuxtLink
              v-if="getIsAuthenticated"
              key="Profile"
              to="/profile"
              class="text-sm font-medium transition"
              :class="{ 'text-blue-600': isActive('/profile') }"
              >
              <DropdownMenuItem style="cursor:pointer">
                Profile
              </DropdownMenuItem>
            </NuxtLink>
            <div v-if="getIsAuthenticated">
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">
                <NuxtLink>
                  Logout
                </NuxtLink>
              </DropdownMenuItem>
            </div>
            <div v-else>

              <NuxtLink
              v-if="!getIsAuthenticated"
              key="Login"
              to="/login"
              class="text-sm font-medium transition"
              :class="{ 'text-blue-600': isActive('/login') }"
              >
              <DropdownMenuItem>
                Login
              </DropdownMenuItem>
            </NuxtLink>

            <NuxtLink
              v-if="!getIsAuthenticated"
              key="Sign Up"
              to="/signup"
              class="text-sm font-medium transition"
              :class="{ 'text-blue-600': isActive('/signup') }"
              >
              <DropdownMenuItem>
                Sign Up
              </DropdownMenuItem>
            </NuxtLink>
            </div>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
        <!-- <NavigationMenu class="flex space-x-4">

          <Popover v-if="authStore.getIsAuthenticated">
            <PopoverTrigger class="text-sm font-medium transition">Logout</PopoverTrigger>
            <PopoverContent class="p-2 w-auto">
            <NuxtLink>
              <Button @click="logout">Logout</Button>
            </NuxtLink>
          </PopoverContent>
        </Popover>
        </NavigationMenu> -->
      </div>
    </nav>
    <!-- Page Content -->
    <main class="container mx-auto px-6 py-8 pb-0">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'

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
const apiBase = useNuxtApp().$apiBase;

const logout = async () => {
  try {
    await $fetch(`${apiBase}/api/auth/jwt/token/logout/`, {method: 'POST', credentials: 'include'});
    authStore.setAuthenticated(false);
    router.push('/login')

  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const colorMode = useColorMode()
const toggleDark = () => {
  colorMode.preference = colorMode.preference == 'dark' ? 'light' : 'dark';
}
</script>
