import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_END_URL } from 'constants/back-end-link';
import { IeditProfileProps } from 'store/interfaces/edit-profile';
import { Iuser } from 'store/interfaces/sign-slice';

export const editProfileFetch = createAsyncThunk<
  Iuser,
  IeditProfileProps,
  {
    rejectValue: number;
  }
>('user/editProfileFetch', async (props, { rejectWithValue }) => {
  const { login, name, password, id, token } = props;
  console.log(token);
  return axios
    .put(
      `${BACK_END_URL}users/${id}`,
      {
        name: name,
        login: login,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      console.log(response.data);

      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.statusCode);
    });
});
