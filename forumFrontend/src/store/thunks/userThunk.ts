import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError } from '../../typed';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: ValidationError}
>(
  'users/register',
  async (registerMutation: RegisterMutation, {rejectWithValue}) => {
    try {
      const response = await axiosAPI.post<RegisterResponse>('/users', registerMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
    }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosAPI.delete(`users`, {headers: {'Authorization': token}});
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosAPI.post<RegisterResponse>('/users/session', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);