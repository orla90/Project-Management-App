import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import {
  BoardProps,
  BoardsProps,
  ColumnProps,
  IdeleteColumn,
  IuppdateTitle,
} from 'store/interfaces/board';
import { RootState } from 'store/types/types-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERRORS_CODE } from 'constants/errors';
import i18Obj from 'texts/errors-and-warnings/translate';

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
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestGetBoards}`);
        }
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
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestGetBoard}`);
        }
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const createColumnFetch = createAsyncThunk(
  'board/createColumn',
  async (props: ColumnProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .post(
        `${BACK_END_URL}boards/${board._id}/columns`,
        {
          title: props.title,
          _id: props._id,
          boardId: props.boardId,
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
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestColumnAdd}`);
        }
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getColumnsFetch = createAsyncThunk(
  'board/getColumns',
  async (props: ColumnProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .get(`${BACK_END_URL}boards/${board._id}/columns`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data.sort((a: ColumnProps, b: ColumnProps) => a.order! - b.order!);
      })
      .catch((error) => {
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestGetColumns}`);
        }
        return rejectWithValue(error);
      });
  }
);

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
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestUpdateColumnTitle}`);
        }
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
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestDeleteColumn}`);
        }
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const uppdateOrdersColumns = createAsyncThunk(
  'board/uppdateOrdersColumns',
  async (props: Array<ColumnProps>, { getState }) => {
    const state = getState() as RootState;
    return axios
      .patch(`${BACK_END_URL}columnsSet`, props, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => response.data)
      .catch(() => alert('Что-то пошло не так при обновлении очерёдности колонок'));
  }
);
