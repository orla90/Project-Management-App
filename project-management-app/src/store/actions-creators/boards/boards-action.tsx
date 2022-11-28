import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { ERRORS_CODE } from 'constants/errors';
import { Language } from 'pages/welcome-page/types/types';
import { toast } from 'react-toastify';
import { RootState } from 'store/types/types-redux';
import i18Obj from 'texts/errors-and-warnings/translate';

export interface ICreateBoardProps {
  title: string;
  owner: string;
  users: [];
  lang: Language;
}

export interface IGetBoardsByUserIdProps {
  userId: string;
  lang: Language;
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
        return response.data;
      })
      .catch((error) => {
        if (error.code === ERRORS_CODE.BAD_REQUEST) {
          toast.error(`${i18Obj[props.lang!].badRequestCreateBoard}`);
        }
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
