import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IsignProps } from 'store/interfaces/signUpProps';

export const signInFetch = createAsyncThunk<
  { token: string },
  IsignProps,
  {
    rejectValue: number;
  }
>('user/signInFetch', async (props, thunkApi) => {
  const { login, password } = props;
  return axios
    .post(`${BACK_END_URL}auth/signin`, {
      login: login,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return thunkApi.rejectWithValue(error.response.data.statusCode);
    });
});
