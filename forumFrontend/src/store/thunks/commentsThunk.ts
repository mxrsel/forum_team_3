import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const getAllPostComments = createAsyncThunk<Comment[], string>(
  'comments/getAllPostComments',
  async(postId) => {
    const response = await axiosAPI.get(`/comments/${postId}`);
    if(!postId) return [];
    return response.data.comments || [];
  }
)