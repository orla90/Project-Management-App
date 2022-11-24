import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { RootState } from 'store/types/types-redux';

export interface ICreateBoardProps {
  title: string;
  owner: string;
  users: [];
}

export interface IUpdateBoardProps {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IGetBoardsByUserIdProps {
  userId: string;
}

export interface IDeleteBoardProps {
  id: string;
}

export const createBoardFetch = createAsyncThunk(
  'boards/create',
  async (props: ICreateBoardProps, { getState }) => {
    const state = getState() as RootState;

    const response = await axios.post(`${BACK_END_URL}boards`, props, {
      headers: {
        Authorization: `Bearer ${state.signSlice.user!.token}`,
      },
    });

    return response.data;
  }
);

export const getBoardsByUserIdFetch = createAsyncThunk(
  'boards/get',
  async (props: IGetBoardsByUserIdProps, { getState }) => {
    const state = getState() as RootState;

    const response = await axios.get(`${BACK_END_URL}boardsSet/${props.userId}`, {
      headers: {
        Authorization: `Bearer ${state.signSlice.user!.token}`,
      },
    });

    return response.data;
  }
);

export const updateBoardFetch = createAsyncThunk(
  'boards/put',
  async (props: IUpdateBoardProps, { getState }) => {
    const state = getState() as RootState;

    const response = await axios.put(
      `${BACK_END_URL}boards/${props._id}`,
      { title: props.title, owner: props.owner, users: props.users },
      {
        headers: {
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteBoardFetch = createAsyncThunk(
  'boards/delete',
  async (props: IDeleteBoardProps, { getState }) => {
    const state = getState() as RootState;

    const response = await axios.delete(`${BACK_END_URL}boards/${props.id}`, {
      headers: {
        Authorization: `Bearer ${state.signSlice.user!.token}`,
      },
    });

    return response.data;
  }
);
