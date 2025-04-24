<template>
  <div class="min-h-screen transition-colors duration-300">
    <!-- Header Section -->
    <header class="container mx-auto px-4 py-6 flex justify-end items-center">
      <!-- Removed h1 title and toggle button -->
    </header>

    <!-- Hero Section -->
    <main class="container mx-auto px-4 py-16 text-center">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
        Welcome to <span>MyApp</span>
      </h2>
      <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Experience the future of whatever MyApp does. Join us and explore the amazing possibilities.
      </p>
      <div class="space-x-4">
        <Button class="font-bold py-3 px-6 rounded-lg transition-colors shadow-md">
          Get Started
        </Button>
        <Button class="font-bold py-3 px-6 rounded-lg transition-colors shadow-md">
          Learn More
        </Button>
      </div>

      <div class="mt-12 text-sm">
        User is currently: {{ isAuthenticated ? 'Authenticated' : 'Not Authenticated' }}
      </div>
    </main>

    <!-- Placeholder for Features Section -->
    <section class="container mx-auto px-4 py-16 border-t">
       <h3 class="text-3xl font-bold text-center mb-12">Features</h3>
       <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
         <!-- Feature 1 -->
         <Card>
           <CardHeader class="text-center">
             <CardTitle>Feature One</CardTitle>
           </CardHeader>
           <CardContent>
             <p>Description of the first amazing feature.</p>
           </CardContent>
         </Card>
         <!-- Feature 2 -->
         <Card>
           <CardHeader class="text-center">
             <CardTitle>Feature Two</CardTitle>
           </CardHeader>
           <CardContent>
             <p>Description of the second incredible feature.</p>
           </CardContent>
         </Card>
         <!-- Feature 3 -->
         <Card>
           <CardHeader class="text-center">
             <CardTitle>Feature Three</CardTitle>
           </CardHeader>
           <CardContent>
             <p>Description of the third awesome feature.</p>
           </CardContent>
         </Card>
       </div>
    </section>

    <!-- Footer Section -->
    <footer class="container mx-auto px-4 py-6 text-center border-t">
      &copy; {{ new Date().getFullYear() }} MyApp. All rights reserved.
    </footer>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);

useHead({
  title: 'Welcome to MyApp',
  meta: [
    { name: 'description', content: 'Discover the amazing features of MyApp.' }
  ],
  bodyAttrs: {
    class: 'antialiased font-sans'
  },
})

</script>
