import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { BoardProps, BoardsProps, ColumnProps } from 'store/interfaces/board';
import { RootState } from 'store/types/types-redux';

export const getBoardsFetch = createAsyncThunk(
  'boards/get',
  async (props: BoardsProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .get(`${BACK_END_URL}boards`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getBoardFetch = createAsyncThunk(
  'board/get',
  async (props: BoardProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .get(`${BACK_END_URL}boards/${props._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const createColumnFetch = createAsyncThunk(
  'board/addColumn',
  async (props: ColumnProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .post(`${BACK_END_URL}boards/${state.boardSlice.board.board._id}/columns`, props, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getColumnsFetch = createAsyncThunk(
  'board/getColumns',
  async (props: ColumnProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    return axios
      .get(`${BACK_END_URL}boards/${state.boardSlice.board.board._id}/columns`, {
        headers: {
          'Content-Type': 'application/json',
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
