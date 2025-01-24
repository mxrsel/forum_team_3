import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { sendPost } from '../thunks/newPostThunk';

interface State {
  sending: boolean;
}

const initialState: State = {
  sending: false,
};

const slice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPost.pending, (state) => {
        state.sending = true;
      })
      .addCase(sendPost.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendPost.rejected, (state) => {
        state.sending = false;
      });
  },
});

export const newPostReducer = slice.reducer;

export const selectSending = (state: RootState) => state.newPost.sending;
