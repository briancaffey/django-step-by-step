<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Function to handle login
const login = async () => {
  try {
    const response = await $fetch('http://localhost/api/auth/jwt/token/', {
      method: 'POST',
      body: {
        email: authStore.email,
        password: authStore.password
      }
    })

    if (response.access) {
      alert('Login successful')
      router.push('/') // Redirect to a dashboard or other page
      authStore.setAuthenticated(true)
    } else {
      alert(response.message || 'Login failed')
    }
  } catch (error) {
    console.log(error);
    console.error('Error during login:', error)
    alert('An error occurred. Please try again.')
  }
}
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
            placeholder="m@example.com"
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
    </Card>
  </div>
</template>
