<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'
import { useProfile } from '@/composables/useProfile';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const route = useRouter();
const isActive = (path) => route.path === path
const authStore = useAuthStore()
const router = useRouter()
const { toast } = useToast();
const apiBase = useNuxtApp().$apiBase;

// const {fetchProfile } = useProfile();

// Function to handle login
const signUp = async () => {
  console.log('signing up')
  try {
    // this API call will set HttpOnly cookie with the access and refresh JWT tokens on the client
    const response = await $fetch(`${apiBase}/api/register/`, {
      method: 'POST',
      body: {
        email: authStore.email,
        password: authStore.password
      }
    });
    console.log('request was successful')
    console.log('preparing toast...')

    // router.push('/') // Redirect to a dashboard or other page

        // Wait for 1.5 seconds before navigating
    setTimeout(() => {
      router.push('/')
    }, 1500);
    toast({
      title: 'Activate your account',
      description: 'Please click the link in the verification email we sent.',
    });
    authStore.email = '';
    authStore.password = '';


  } catch (error) {
    console.log(error);
    console.error('Error during login:', error)
  }
}
</script>

<template>
  <Toaster />
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Sign Up</CardTitle>
        <CardDescription>Enter your email below to sign up for a new account.</CardDescription>
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
        <Button class="w-full" @click="signUp">Sign up</Button>
      </CardFooter>
      <CardFooter>

        <NuxtLink
          key="Login"
          to="/login"
          class="text-sm font-medium transition"
          >
          Login to an existing account
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>
