import { createSlice } from '@reduxjs/toolkit';
import {
  createColumnFetch,
  deleteColumnFetch,
  getBoardFetch,
  getColumnsFetch,
} from 'store/actions-creators/board/board-action';
import {
  deleteTaskFetch,
  editTaskFetch,
  getTasksColumnFetch,
} from 'store/actions-creators/board/task-actions';
import { ColumnProps } from 'store/interfaces/board';

const initialState = {
  board: null,
  columns: [] as ColumnProps[],
  overlay: false,
  columnOrder: 0,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload.board;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    resetBordAndColumns: (state) => {
      state.columns = [];
      state.board = null;
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
      state.columnOrder = action.payload.length;
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
      state.overlay = true;
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
      state.overlay = true;
    });
    builder.addCase(getTasksColumnFetch.fulfilled, (state, action) => {
      console.log('Получении заданий колонки fulfilled', action.payload);
      state.overlay = false;
    });
    builder.addCase(getTasksColumnFetch.rejected, (state) => {
      console.log('При получении заданий колонки произошла ошибка rejected');
      state.overlay = false;
    });
    builder.addCase(deleteTaskFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(deleteTaskFetch.fulfilled, (state) => {
      console.log('Удалена задача fulfilled');
      state.overlay = false;
    });
    builder.addCase(deleteTaskFetch.rejected, (state) => {
      console.log('При удалении задачи произошла ошибка rejected');
      state.overlay = false;
    });
    builder.addCase(editTaskFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(editTaskFetch.fulfilled, (state) => {
      console.log('Задача обновлена fulfilled');
      state.overlay = false;
    });
    builder.addCase(editTaskFetch.rejected, (state) => {
      console.log('При обновлении задачи произошла ошибка rejected');
      state.overlay = false;
    });
  },
});

export default boardSlice.reducer;
