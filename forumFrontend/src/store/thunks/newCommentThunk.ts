import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { CommentMutation } from '../../typed';
import axiosAPI from '../../utils/axiosAPI.ts';
import { getAllPostComments } from './commentsThunk.ts';

export const sendComment = createAsyncThunk<
  void,
  CommentMutation,
  { state: RootState }
>('newComment/sendComment', async (mutation, { dispatch, getState }) => {
  const token = getState().users.user?.token;
  const post = getState().posts.onePost;

  if (post) {
    await axiosAPI.post(
      '/comments',
      { post: post._id, commentText: mutation.commentText },
      {
        headers: { Authorization: token },
      }
    );

    await dispatch(getAllPostComments(post._id));
  }
});
