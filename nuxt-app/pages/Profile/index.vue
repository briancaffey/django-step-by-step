<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { useProfile } from '@/composables/useProfile'
import { onMounted, h } from 'vue'

const { profileStore, fetchProfile, updateProfile } = useProfile()

onMounted(() => {
  fetchProfile()
})

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    firstName: profileStore.firstName,
    lastName: profileStore.lastName
  }
})

const onSubmit = handleSubmit((values) => {
  updateProfile(values.firstName, values.lastName)
  toast({
    title: 'Profile Updated',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    ),
  });
})
</script>

<template>
  <Toaster />
  <div class="flex justify-center items-center">
    <Card class="w-full max-w-md p-6">
      <h1 class="text-3xl font-bold pb-4">Profile</h1>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
              type="text"
              placeholder="John"
              v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input
              type="text"
              placeholder="Doe"
              v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full">
          Submit
        </Button>
      </form>
    </Card>
    </div>
</template>
