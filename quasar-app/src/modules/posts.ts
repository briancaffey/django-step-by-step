import { ref, computed, watch, reactive } from 'vue';
import { api } from 'boot/axios';
import { apiService } from '../classes';
import usePagination from '../modules/pagination';

import { GetPostsOptionsType, PostType } from '../types';

interface User {
  email: string;
  id: number;
}

interface Post {
  body: string;
  id: number;
  image: string;
  like_count: number;
  liked: boolean;
  created_by: User | null;
  modified_on: string;
}

const postList = ref<PostType[]>([]);
const postCount = ref(0);
const loadingPosts = ref(false);

const post = reactive<Post>({
  body: '',
  id: 0,
  image: '',
  like_count: 0,
  created_by: null,
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
    const res = await api.get<Post>(`/api/drf/fbv/posts/${postId}/`);
    const postJson = res.data;
    post.body = postJson.body;
    post.id = postJson.id;
    post.image = postJson.image;
    post.like_count = postJson.like_count;
    post.created_by = postJson.created_by;
    post.liked = postJson.liked;
    post.modified_on = postJson.modified_on;
    console.log(postJson.modified_on);
  };

  const deletePost = async (postId: number): Promise<void> => {
    await api.delete(`/api/drf/fbv/posts/${postId}/`);
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
  };
}
