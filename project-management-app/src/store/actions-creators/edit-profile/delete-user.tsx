import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_END_URL } from 'constants/back-end-link';
import { IdeleteUser } from 'store/interfaces/delete-user';
import { Iuser } from 'store/interfaces/sign-slice';

export const deleteUserFetch = createAsyncThunk<
  IdeleteUser,
  Iuser,
  {
    rejectValue: number;
  }
>('user/deleteUserFetch', async (props, { rejectWithValue }) => {
  const { id, token } = props;
  return axios
    .delete(`${BACK_END_URL}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.statusCode);
    });
});
