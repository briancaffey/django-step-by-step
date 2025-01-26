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
const resetPassword = async () => {
  try {
    // this API call will set HttpOnly cookie with the access and refresh JWT tokens on the client
    const response = await $fetch(`${apiBase}/api/auth/jwt/token/`, {
      method: 'POST',
      body: {
        email: authStore.email,
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
</script>

<template>
  <div class="flex items-center justify-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          An email will be sent to this account with a password reset link if an account using this email exists.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            v-model="authStore.email"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="resetPassword">Reset Password</Button>
      </CardFooter>

    </Card>
  </div>
</template>
