import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PostsMutation } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const sendPost = createAsyncThunk<
  void,
  PostsMutation,
  { state: RootState }
>('newPost/sendPost', async (mutation, { getState }) => {
  const token = getState().users.user?.token;

  const body = new FormData();
  body.append('postTitle', mutation.postTitle);

  if (mutation.postContent) {
    body.append('postContent', mutation.postContent);
  }

  if (mutation.postImage) {
    body.append('images', mutation.postImage);
  }

  await axiosAPI.post('/posts', body, {
    headers: { Authorization: token },
  });
});
