import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { Dispatch } from 'react';
import { getColumnsFetch } from 'store/actions-creators/board/board-action';
import {
  getAllBoardTasksFetch,
  getAllUserLoginFetch,
} from 'store/actions-creators/board/task-actions';
import { ColumnProps } from 'store/interfaces/board';
import { AppDispatch } from 'store/types/types-redux';

export const getAllUserLoginst = async (board: IBoard, dispatch: AppDispatch) => {
  board.users.forEach(async (userID: string) => {
    await dispatch(getAllUserLoginFetch({ id: userID }));
  });
};

export const getColumnsAndTasks = async (
  dispatch: AppDispatch,
  setColumns: Dispatch<Array<ColumnProps> | []>
) => {
  await dispatch(getAllBoardTasksFetch({}));
  setColumns((await dispatch(getColumnsFetch({}))).payload);
};
