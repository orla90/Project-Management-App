import { createSlice } from '@reduxjs/toolkit';
import { getBoardFetch } from 'store/actions-creators/board/board-action';

const initialState = {
  board: {},
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardFetch.fulfilled, (state, action) => {
      state.board = action.payload;
    });
  },
});

export default boardSlice.reducer;
