import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_END_URL } from 'constants/back-end-link';
import { IeditProfileProps } from 'store/interfaces/edit-profile';

export const editProfileFetch = createAsyncThunk(
  'user/editProfileFetch',
  async (props: IeditProfileProps, { rejectWithValue }) => {
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
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);
