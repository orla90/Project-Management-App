import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { Itasks } from 'pages/board-page/interfaces/task-interface';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { TaskDeleteParams, TaskChangeParams, UserProps } from 'store/interfaces/board';
import { RootState } from 'store/types/types-redux';

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
      return response.data.sort((a: Itasks, b: Itasks) => a.order! - b.order!);
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
        order: props.order,
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

export const deleteTaskFetch = createAsyncThunk(
  'board/deleteTask',
  async (props: TaskDeleteParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .delete(
        `${BACK_END_URL}boards/${board._id}/columns/${props.columnId}/tasks/${props.taskId}`,
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

export const editTaskFetch = createAsyncThunk(
  'board/editTask',
  async (props: TaskChangeParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .put(
        `${BACK_END_URL}boards/${board._id}/columns/${props.columnId}/tasks/${props.taskId}`,
        {
          title: props.title,
          description: props.description,
          order: props.order,
          users: props.users,
          userId: props.userId,
          columnId: props.columnId!,
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
        console.log(error);
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getTaskFetch = createAsyncThunk(
  'board/getTask',
  async (props: TaskChangeParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const board = state.boardSlice.board! as IBoard;
    return axios
      .get(`${BACK_END_URL}boards/${board._id}/columns/${props.columnId}/tasks/${props.taskId}`, {
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
        return rejectWithValue(error.response.data.statusCode);
      });
  }
);

export const getUsersFetch = createAsyncThunk(
  'board/getAllUsers',
  async (props: UserProps, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    return axios
      .get(`${BACK_END_URL}users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      })
      .then((response) => {
        return response.data.sort();
      })
      .catch((error) => {
        console.log(error);
        return rejectWithValue([]);
      });
  }
);

export const getAllUserLoginFetch = createAsyncThunk(
  'board/getLoginAndIDUser',
  async (props: { id: string }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    return axios
      .get(`${BACK_END_URL}users/${props.id}`, {
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
  }
);
