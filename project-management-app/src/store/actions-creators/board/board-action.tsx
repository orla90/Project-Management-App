import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { BoardProps, BoardsProps, ColumnProps } from 'store/interfaces/board';
import { RootState } from 'store/types/types-redux';

export const getvFetch = createAsyncThunk(
  'boards/getBoards',
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
  'board/getBoard',
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
    const board = state.boardSlice.board! as IBoard;
    return axios
      .post(`${BACK_END_URL}boards/${board._id}/columns`, props, {
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
    const board = state.boardSlice.board as IBoard | null;
    if (board) {
      return axios
        .get(`${BACK_END_URL}boards/${board._id}/columns`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.signSlice.user!.token}`,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return rejectWithValue(error);
        });
    } else {
      return rejectWithValue('no board in the storage');
    }
  }
);

interface IuppdateTitle {
  title: string;
  columnId: string;
  order: number;
}

interface IdeleteColumn {
  columnId: string;
}

export const uppdateColumnTitleFetch = createAsyncThunk(
  'board/uppdateColumnTitle',
  async (props: IuppdateTitle, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .put(
        `${BACK_END_URL}boards/${board._id}/columns/${props.columnId}`,
        {
          title: props.title,
          order: props.order,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.signSlice.user!.token}`,
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

export const deleteColumnFetch = createAsyncThunk(
  'board/deleteColumnTitle',
  async (props: IdeleteColumn, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .delete(`${BACK_END_URL}boards/${board._id}/columns/${props.columnId}`, {
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
