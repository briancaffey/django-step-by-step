<template>
  <div>Verifying your account...</div>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useProfile } from '@/composables/useProfile'

const route = useRoute();
const { uid, token } = route.params;

// make an api call to /api/activate/{uid}/{token} using fetch
// if the response is 200, then show a success message
// if the response is 400, then show an error message
const activateAccount = async () => {
  const response = await fetch(`/api/activate/${uid}/${token}/`, {
    method: 'POST',
  });
  if (response.status === 200) {
    console.log('Account activated successfully');

    await useAuth();
    await useProfile();
    navigateTo('/profile');
  } else {
    console.error('Error activating account');
  }
};

// onMounted, call the activateAccount function
onMounted(() => {
  // TODO: remove this
  setTimeout(() => {
    activateAccount();
  }, 2000);
});

</script>
