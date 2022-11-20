import { createSlice } from '@reduxjs/toolkit';
import { IBoardItemProps } from 'pages/boards-list-page/components/interfaces/IBoardItemProps';
import { getBoardFetch } from 'store/actions-creators/board/board-action';
import { ColumnProps } from 'store/interfaces/board';

const initialState = {
  board: {} as IBoardItemProps,
  columns: [] as ColumnProps[],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardFetch.fulfilled, (state, action) => {
      state.board = action.payload;
    });
  },
});

export default boardSlice.reducer;
