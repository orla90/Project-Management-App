import { createSlice } from '@reduxjs/toolkit';
import { IBoardItemProps } from 'pages/boards-list-page/components/interfaces/IBoardItemProps';
import {
  createColumnFetch,
  deleteColumnFetch,
  getBoardFetch,
  getColumnsFetch,
} from 'store/actions-creators/board/board-action';
import { getTasksColumnFetch } from 'store/actions-creators/board/task-actions';
import { ColumnProps } from 'store/interfaces/board';

const initialState = {
  board: null,
  columns: [] as ColumnProps[],
  overlay: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      console.log('СОХРАНЯЕМ БОРД', action.payload);
      state.board = action.payload.board;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardFetch.fulfilled, (state, action) => {
      console.log('Получение борда fulfilled', action.payload);
      state.board = action.payload;
    });

    builder.addCase(getColumnsFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(getColumnsFetch.fulfilled, (state, action) => {
      console.log('получение колонки fulfilled', action.payload);
      state.columns = action.payload;
      state.overlay = false;
    });
    builder.addCase(getColumnsFetch.rejected, (state, action) => {
      console.log('Ошибка при получении всех колонок', action.payload);
      state.overlay = false;
    });

    builder.addCase(createColumnFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(createColumnFetch.fulfilled, (state) => {
      console.log('Создалась колонка fulfilled');
      state.overlay = false;
    });
    builder.addCase(createColumnFetch.rejected, (state) => {
      console.log('При создании колонки что-то пошло не так rejected');
      state.overlay = false;
    });

    builder.addCase(deleteColumnFetch.pending, (state) => {
      state.overlay = false;
    });
    builder.addCase(deleteColumnFetch.fulfilled, (state) => {
      console.log('Удалена колонка fulfilled');
      state.overlay = false;
    });
    builder.addCase(deleteColumnFetch.rejected, (state) => {
      console.log('При удалении произошла ошибка rejected');
      state.overlay = false;
    });

    builder.addCase(getTasksColumnFetch.pending, (state) => {
      state.overlay = false;
    });
    builder.addCase(getTasksColumnFetch.fulfilled, (state, action) => {
      console.log('Получении заданий колонки fulfilled', action.payload);
      state.overlay = false;
    });
    builder.addCase(getTasksColumnFetch.rejected, (state) => {
      console.log('При получении заданий колонки произошла ошибка rejected');
      state.overlay = false;
    });
  },
});

export default boardSlice.reducer;
