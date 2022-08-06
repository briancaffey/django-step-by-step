import { ref, computed, watch, reactive } from 'vue';
import { apiService } from '../classes';
import usePagination from '../modules/pagination';

import { GetPostsOptionsType, PostType } from '../types';

const postList = ref<PostType[]>([]);
const postCount = ref(0);
const loadingPosts = ref(false);
const errorLoadingPosts = ref(false);

const post = reactive<PostType>({
  body: '',
  id: 0,
  image: '',
  like_count: 0,
  created_by: {email: '', id: 0},
  liked: false,
  modified_on: '1970-01-01T00:00:00.000000-00:00',
});

export function usePost() {
  const togglePostLike = async (postId: number): Promise<void> => {
    const [error, data] = await apiService.togglePostLike(postId);

    if (error) {
      console.error(error);
      // handle error
      return
    }

    if (data) {
      // handle success
      post.liked = data.liked;
      post.like_count = data.like_count;
    }
  };

  // use this for a single post
  const getPost = async (postId: number): Promise<void> => {
    const [error, data] = await apiService.getPost(postId);
    if (error) {
      //handle error
      console.error(error)
    }
    if (data) {
      // handle success

      // Can this be simplified? Is there a way to assign multiple values to a reactive object at once?
      post.body = data.body;
      post.id = data.id;
      post.image = data.image;
      post.like_count = data.like_count;
      post.liked = data.liked;
      post.created_by = data.created_by;
      post.modified_on = data.modified_on;
    }
  };

  const deletePost = async (postId: number): Promise<void> => {
    const [error, data] = await apiService.deletePost(postId);
    if (error) {
      //handle error
      console.error(error)
    }

    if (data) {
      // handle success

      // TODO: implement component for deleting posts
      console.log('post deleted')
    }
  };

  return { post, getPost, deletePost, togglePostLike };
}

// use this for a list of posts
export default function usePosts() {

  const { currentPage, limit, offset } = usePagination();

  const getPosts = async (): Promise<void> => {
    loadingPosts.value = true;
    // get posts
    const options: GetPostsOptionsType = { params: { offset: offset.value * limit.value, limit: limit.value } }
    const [error, data] = await apiService.getPosts(options);

    if (error) {
      console.error(error);
      loadingPosts.value = false;
      errorLoadingPosts.value = true;
      // handle error
      return

    }
    if (data) {
      // handle success
      postList.value = data.results;
      postCount.value = data.count;
    }
    loadingPosts.value = false;
  };

  watch(currentPage, getPosts);

  const posts = computed(() => postList.value);

  return {
    posts,
    postCount,
    getPosts,
    currentPage,
    limit,
    offset,
    loadingPosts,
    errorLoadingPosts
  };
}
