import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { Iuser } from 'store/interfaces/sign-slice';
import { AppDispatch, RootState } from 'store/types/types-redux';
import { findUser } from './find-user-fn';

export interface IgetUserByID {
  id: string;
  dispatch?: AppDispatch;
}

export const inviteUserFetch = createAsyncThunk<
  Iuser,
  IgetUserByID,
  {
    rejectValue: { en: string; ru: string };
  }
>('user/getUserById', async (props: IgetUserByID, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const board = state.boardSlice.board! as IBoard;
  const { dispatch } = props;
  return axios
    .get(`${BACK_END_URL}users/${props.id}`, {
      headers: {
        Authorization: `Bearer ${state.signSlice.user!.token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => {
      if (!findUser(props.id, board.users)) {
        dispatch!(uppdateUsersInBoard({ id: props.id }));
      } else {
        return rejectWithValue({
          en: 'This user has already been added',
          ru: 'Этот пользователь уже добавлен',
        });
      }
      return response.data;
    })
    .catch(() => {
      return rejectWithValue({
        en: 'User with this ID was not found',
        ru: 'Пользователь с данным ID не найден',
      });
    });
});

export const uppdateUsersInBoard = createAsyncThunk<
  { en: string; ru: string },
  { id: string },
  {
    rejectValue: { en: string; ru: string };
  }
>('user/uppdateUsersInBoard', async (props: { id: string }, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const board = state.boardSlice.board! as IBoard;
  return axios
    .put(
      `${BACK_END_URL}boards/${board._id}`,
      {
        title: JSON.stringify(board.title),
        owner: board.owner,
        users: [...board.users, props.id],
      },
      {
        headers: {
          Authorization: `Bearer ${state.signSlice.user!.token}`,
          Accept: 'application/json',
        },
      }
    )
    .then(() => {
      return {
        en: 'The user is added',
        ru: 'Пользователь добавлен',
      };
    })
    .catch(() => {
      return rejectWithValue({
        en: 'Something went wrong when updating, try later',
        ru: 'Что-то пошло не так при обновлении, попробуйте позже',
      });
    });
});
