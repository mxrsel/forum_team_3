import { createAsyncThunk } from '@reduxjs/toolkit';
import { Posts } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const getAllPosts = createAsyncThunk<Posts[], void>(
  'posts/getAllPosts',
  async() => {
      const response = await axiosAPI.get('/posts');
      return response.data.posts || []
  }
);

export const getPostById = createAsyncThunk<Posts | null, string >(
  'posts/getPostById',
  async(postId) => {
    const response = await axiosAPI.get(`/posts/${postId}`);
    if(!response.data.post) return null;
    return response.data.post
  }
);