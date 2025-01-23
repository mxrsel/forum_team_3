import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';
import { PostMutation, ValidationError } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const sendPost = createAsyncThunk<
  void,
  PostMutation,
  { rejectValue: ValidationError; state: RootState }
>('newPost/sendPost', async (mutation, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;

    const body = new FormData();
    body.append('postTitle', mutation.postTitle);

    if (mutation.postContent) {
      body.append('postContent', mutation.postContent);
    }

    if (mutation.images) {
      body.append('images', mutation.images);
    }

    await axiosAPI.post('/posts', body, {
      headers: { Authorization: token },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
