import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

interface Post {
  id: number;
}

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
      const resp = await api.post<Post>('/api/drf/fbv/posts/new/', formData);
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
