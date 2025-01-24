import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { sendComment } from '../thunks/newCommentThunk';

interface State {
  sending: boolean;
}

const initialState: State = {
  sending: false,
};

const slice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendComment.pending, (state) => {
        state.sending = true;
      })
      .addCase(sendComment.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendComment.rejected, (state) => {
        state.sending = false;
      });
  },
});

export const newCommentReducer = slice.reducer;

export const selectSending = (state: RootState) => state.newPost.sending;
