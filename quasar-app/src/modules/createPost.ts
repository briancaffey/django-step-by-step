/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */


import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default function useCreatePost() {

  const body = ref('');
  const image = ref('');
  const router = useRouter();

  const createPost = async (): Promise<void> => {

    const formData = new FormData();

    try {
      formData.append('body', body.value);
      if (image.value) {
        formData.append('image', image.value);
      };
      const resp = await api.post('/api/drf/fbv/posts/new/', formData);
      const id: number = resp.data.id;

      await router.push(`/posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };


  return {
    body,
    image,
    createPost,
    reset: () => { body.value = ''; image.value = ''; }
  };
}