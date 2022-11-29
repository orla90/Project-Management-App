import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { ICreateBoardProps } from 'store/interfaces/ICreateBoardProps';
import { IDeleteBoardProps } from 'store/interfaces/IDeleteBoardProps';
import { IGetBoardsByUserIdProps } from 'store/interfaces/IGetBoardByUserIdProps';
import { IServerBoard } from 'store/interfaces/IServerBoard';
import { IUpdateBoardProps } from 'store/interfaces/IUpdateBoardProps';
import { RootState } from 'store/types/types-redux';

export const createBoardFetch = createAsyncThunk(
  'boards/create',
  async (props: ICreateBoardProps, { getState }) => {
    const state = getState() as RootState;
    const data = { ...props, title: JSON.stringify(props.title) };

    const response = await axios.post(`${BACK_END_URL}boards`, data, {
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

    response.data.forEach((board: IServerBoard) => {
      board.title = JSON.parse(board.title);
    });

    return response.data;
  }
);

export const updateBoardFetch = createAsyncThunk(
  'boards/put',
  async (props: IUpdateBoardProps, { getState }) => {
    const state = getState() as RootState;
    const data = { ...props, title: JSON.stringify(props.title) };

    const response = await axios.put(
      `${BACK_END_URL}boards/${data._id}`,
      { title: data.title, owner: data.owner, users: data.users },
      {
        headers: {
          Authorization: `Bearer ${state.signSlice.user!.token}`,
        },
      }
    );

    response.data.title = JSON.parse(response.data.title);

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
