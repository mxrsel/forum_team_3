import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PostMutation } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const sendPost = createAsyncThunk<
  void,
  PostMutation,
  { state: RootState }
>('newPost/sendPost', async (mutation, { getState }) => {
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
});
