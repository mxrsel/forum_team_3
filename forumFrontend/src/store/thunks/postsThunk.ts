import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPosts, Posts } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const getAllPosts = createAsyncThunk<Posts[], void>(
  'posts/getAllPosts',
  async() => {
      const response = await axiosAPI.get('/posts');
      return response.data.posts || []
  }
);

export const getPostById = createAsyncThunk<ApiPosts | null, string >(
  'posts/getPostById',
  async(postId) => {
    const response = await axiosAPI.get(`/posts/${postId}`);
    if(!response.data) return null;
    return response.data
  }
);