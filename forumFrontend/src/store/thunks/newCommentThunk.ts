import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { CommentMutation } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';

export const sendComment = createAsyncThunk<
  void,
  CommentMutation,
  { state: RootState }
>('newComment/sendComment', async (mutation, { getState }) => {
  const token = getState().users.user?.token;

  await axiosAPI.post('/posts', mutation, {
    headers: { Authorization: token },
  });
});
