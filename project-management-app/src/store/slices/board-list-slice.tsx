import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import { useActionData } from 'react-router-dom';
import {
  deleteBoardFetch,
  getBoardsByUserIdFetch,
} from 'store/actions-creators/boards/boards-action';

interface IBoardListState {
  boards: IBoard[];
}

const initialState = {
  boards: [],
} as IBoardListState;

export const boardListSlice = createSlice({
  name: 'board-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBoardsByUserIdFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard[]>) => {
        state.boards = action.payload;
      }
    );
    builder.addCase(
      deleteBoardFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard>) => {
        state.boards = state.boards.filter((value) => value._id !== action.payload._id);
      }
    );
  },
});

export default boardListSlice.reducer;
