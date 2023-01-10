import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import {
  createBoardFetch,
  deleteBoardFetch,
  getBoardsByUserIdFetch,
  updateBoardFetch,
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
      createBoardFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard>) => {
        state.boards.push(action.payload);
      }
    );

    builder.addCase(
      getBoardsByUserIdFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard[]>) => {
        state.boards = action.payload;
      }
    );

    builder.addCase(
      updateBoardFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard>) => {
        const index = state.boards.findIndex((board) => board._id == action.payload._id);
        state.boards[index] = action.payload;
      }
    );

    builder.addCase(
      deleteBoardFetch.fulfilled,
      (state: IBoardListState, action: PayloadAction<IBoard>) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      }
    );
  },
});

export default boardListSlice.reducer;
