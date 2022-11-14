import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';

interface ICreateBoardProps {
  title: string;
  owner: string;
  users: [];
}

export const createBoardFetch = createAsyncThunk(
  'boards/create',
  async (props: ICreateBoardProps, { rejectWithValue }) => {
    return axios
      .post(`${BACK_END_URL}/boards`, props)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);
