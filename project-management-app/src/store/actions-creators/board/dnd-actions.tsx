import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { RootState } from 'store/types/types-redux';
import { dataTask } from './sort-data-all-tasks-fn';

export const MovingTheTask = createAsyncThunk(
  'dnd/MovingTheTask',
  async (props: Array<dataTask>, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    return axios
      .patch(`${BACK_END_URL}tasksSet`, props, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
