import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiPosts, Posts } from '../../typed';
import { getAllPosts, getPostById } from '../thunks/postsThunk.ts';
import { RootState } from '../../app/store.ts';

interface PostsSliceProps {
  posts: Posts[];
  onePost: ApiPosts | null;
  isPostsLoading: boolean;
  isPostsError: boolean;
}

const initialState: PostsSliceProps = {
  posts: [],
  onePost: null,
  isPostsLoading: false,
  isPostsError: false
}

export const selectPostsItem = (state: RootState) => state.posts.posts;
export const selectOnePost = (state:RootState) => state.posts.onePost;
export const selectPostsLoading = (state: RootState) => state.posts.isPostsLoading;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllPosts.pending, (state) => {
          state.isPostsLoading = true;
          state.isPostsError = false;
        }
      )
      .addCase(
        getAllPosts.fulfilled, (state, {payload: posts}) => {
          state.isPostsLoading = false;
          state.posts = posts || []
        }
      )
      .addCase(
        getAllPosts.rejected, (state) => {
          state.isPostsLoading = false;
          state.isPostsError = true;
        }
      )
      .addCase(
        getPostById.pending, (state) => {
          state.isPostsLoading = true;
          state.isPostsError = false;
        }
      )
      .addCase(
        getPostById.fulfilled, (state, action: PayloadAction<ApiPosts | null>) => {
          state.isPostsLoading = false;
          state.onePost = action.payload;
        }
      )
      .addCase(
        getPostById.rejected, (state) => {
          state.isPostsLoading = false;
          state.isPostsError = true;
        }
      )
  }
});

export const postsReducer = postsSlice.reducer;