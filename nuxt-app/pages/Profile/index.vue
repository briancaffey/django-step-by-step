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
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'


import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { useProfile } from '@/composables/useProfile'
import { ref, onMounted, h } from 'vue'

const { profileStore, fetchProfile, updateProfile } = useProfile()

onMounted(() => {
  fetchProfile()
})

const updateUserProfile = () => {
  updateProfile(profileStore.firstName, profileStore.lastName)
}

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('the button was clicked, the values are..')
  console.log(values)
  updateUserProfile()
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  });
})
</script>

<template>
  <Toaster />
  <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="firstName" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="John"
            v-bind="componentField"
            v-model="profileStore.firstName"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="lastName" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Doe"
            v-bind="componentField"
            v-model="profileStore.lastName"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
