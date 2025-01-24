import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { getAllPostComments } from '../thunks/commentsThunk.ts';
import { Comment } from '../../typed';
import { RootState } from '../../app/store.ts';

interface CommentsSliceProps {
  comments: Comment[];
  commentLoading: boolean;
  commentsError: boolean;
}

const initialState: CommentsSliceProps = {
  comments: [],
  commentLoading: false,
  commentsError: false,
}

export const selectorComments = (state: RootState) => state.comments.comments

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllPostComments.pending, (state) => {
          state.commentLoading = true;
          state.commentsError = false;
        }
      )
      .addCase(
        getAllPostComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
          state.commentLoading = false;
          state.comments =  action.payload ;
        }
      )
      .addCase(
        getAllPostComments.rejected, (state) => {
          state.commentLoading = false;
          state.commentsError = true;
        }
      )
  }
});

export const commentsReducer = commentsSlice.reducer

