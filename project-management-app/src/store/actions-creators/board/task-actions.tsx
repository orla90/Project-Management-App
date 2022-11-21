import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { RootState } from 'store/types/types-redux';
interface Itasks {
  boardId: string;
  columnId: string;
  description: string;
  order: number;
  title: string;
  userId: string;
  users: [];
  _id: string;
}
export const getTasksColumnFetch = createAsyncThunk<
  Itasks,
  { columnId: string },
  {
    rejectValue: [];
  }
>('board/getTasks', async (props, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const board = state.boardSlice.board! as IBoard;
  return axios
    .get(`${BACK_END_URL}boards/${board._id}/columns/${props.columnId}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.signSlice.user!.token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return rejectWithValue([]);
    });
});

export const createTasksColumnFetch = createAsyncThunk<
  Itasks,
  { columnId: string; title: string; description: string; order: number },
  {
    rejectValue: [];
  }
>('board/createTasksColumn', async (props, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const board = state.boardSlice.board! as IBoard;
  return axios
    .post(
      `${BACK_END_URL}boards/${board._id}/columns/${props.columnId}/tasks`,
      {
        title: props.title,
        order: 1,
        description: props.description,
        userId: state.signSlice.user?.id,
        users: board.users,
      },
      {
        headers: {
          Authorization: `Bearer ${state.signSlice.user?.token}`,
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);

      return rejectWithValue([]);
    });
});
