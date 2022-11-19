import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { RootState } from 'store/types/types-redux';

export interface ICreateBoardProps {
  title: string;
  owner: string;
  users: [];
}

export interface IGetBoardsByUserIdProps {
  userId: string;
}

export const createBoardFetch = createAsyncThunk(
  'boards/create',
  async (props: ICreateBoardProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .post(`${BACK_END_URL}boards`, props, {
        headers: {
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getBoardsByUserIdFetch = createAsyncThunk(
  'boards/get',
  async (props: IGetBoardsByUserIdProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .get(`${BACK_END_URL}boardsSet/${props.userId}`, {
        headers: {
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);
