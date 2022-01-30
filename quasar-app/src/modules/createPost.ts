import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../classes';

export default function useCreatePost() {

  const body = ref('');
  const image = ref('');
  const router = useRouter();

  const createPost = async (): Promise<void> => {

    // formData used for file upload with extra data
    const formData = new FormData();
    formData.append('body', body.value);
    if (image.value) {
      formData.append('image', image.value);
    };

    const [error, data] = await apiService.createPost(formData);

    if (error) {
      console.error(error);
      // TODO: handle error
      return
    }

    if (data) {
      // TODO: handle success
      await router.push(`/posts/${data.id}`);
    }
  };


  return {
    body,
    image,
    createPost,
    reset: () => { body.value = ''; image.value = ''; }
  };
}
