import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IsignProps } from 'store/interfaces/signUpProps';
import { signInFetch } from './sign-in-action';

export const signUpFetch = createAsyncThunk(
  'user/signUpFetch',
  async (props: IsignProps, { rejectWithValue }) => {
    const { login, name, password, dispatch } = props;
    return axios
      .post(`${BACK_END_URL}auth/signup`, {
        name: name,
        login: login,
        password: password,
      })
      .then((response) => {
        dispatch!(signInFetch({ login: login, password: password }));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);
