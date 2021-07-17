/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { ref, computed, watch, reactive } from 'vue';
import { api } from 'boot/axios';
import usePagination from '../modules/pagination';

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

const postList = ref<Post[]>([]);
const postCount = ref(0);

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
    const resp = await api.post(`/api/drf/fbv/posts/${postId}/like/`);
    post.liked = resp.data.liked;
    post.like_count = resp.data.like_count;
  };

  // is there a more consise way to do this?
  const getPost = async (postId: number): Promise<void> => {
    const res = await api.get(`/api/drf/fbv/posts/${postId}/`);
    const postJson = await res.data;
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

export default function usePosts() {

  const { currentPage, limit, offset } = usePagination();

  const getPosts = async (): Promise<void> => {
    const res = await api.get('/api/drf/fbv/posts/', { params: { offset: offset.value * limit.value, limit: limit.value } });
    postList.value = res.data?.results;
    postCount.value = res.data?.count;
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
  };
}