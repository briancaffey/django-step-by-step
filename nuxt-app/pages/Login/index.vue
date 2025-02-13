<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'
import { useProfile } from '@/composables/useProfile';
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const {fetchProfile } = useProfile();
const apiBase = useNuxtApp().$apiBase;

// Function to handle login
const login = async () => {
  try {
    // this API call will set HttpOnly cookie with the access and refresh JWT tokens on the client
    const response = await $fetch(`${apiBase}/api/auth/jwt/token/`, {
      method: 'POST',
      body: {
        email: authStore.email,
        password: authStore.password
      }
    });

    // fetch the user profile data
    authStore.setAuthenticated(true)
    await fetchProfile();
    router.push('/') // Redirect to a dashboard or other page

  } catch (error) {
    console.log(error);
    console.error('Error during login:', error)
  }
}
useHead({title: 'Login'})
</script>

<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            v-model="authStore.email"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            v-model="authStore.password"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="login">Sign in</Button>
      </CardFooter>
      <CardFooter>
        <div>
          <NuxtLink
          key="Sign Up"
          to="/signup"
          class="text-sm font-medium transition"
          >
          Sign up for a new account
        </NuxtLink>
        </div>
      </CardFooter>
      <CardFooter>
        <div>
          <NuxtLink
          key="Sign Up"
          to="/reset-password"
          class="text-sm font-medium transition"
          >
          Forgot your password?
        </NuxtLink>
      </div>
      </CardFooter>
    </Card>
  </div>
</template>
