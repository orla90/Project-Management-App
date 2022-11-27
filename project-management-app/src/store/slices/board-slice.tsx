import { createSlice } from '@reduxjs/toolkit';
import {
  createColumnFetch,
  deleteColumnFetch,
  getBoardFetch,
  getColumnsFetch,
  uppdateOrdersColumns,
} from 'store/actions-creators/board/board-action';
import { MovingTheTask } from 'store/actions-creators/board/dnd-actions';
import {
  deleteTaskFetch,
  editTaskFetch,
  getAllBoardTasksFetch,
  getAllUserLoginFetch,
  getTaskFetch,
  getTasksColumnFetch,
  getUsersFetch,
} from 'store/actions-creators/board/task-actions';
import {
  inviteUserFetch,
  uppdateUsersInBoard,
} from 'store/actions-creators/invite-user/invite-user';
import { ColumnProps } from 'store/interfaces/board';

const initialState = {
  board: null,
  columns: [] as ColumnProps[],
  overlay: false,
  columnOrder: 0,
  tasks: {},
  inviteUserError: { en: '', ru: '' },
  isErrorOrTrue: false,
  usersLogins: {},
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
    resetInviteUserError: (state) => {
      state.inviteUserError = { en: '', ru: '' };
    },
    setNewOrdersTasks: (state, action) => {
      state.tasks = action.payload;
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
      state.overlay = false;
    });
    builder.addCase(createColumnFetch.rejected, (state) => {
      state.overlay = false;
    });

    builder.addCase(deleteColumnFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(deleteColumnFetch.fulfilled, (state) => {
      state.overlay = false;
    });
    builder.addCase(deleteColumnFetch.rejected, (state) => {
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
      state.overlay = false;
    });

    builder.addCase(deleteTaskFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(deleteTaskFetch.fulfilled, (state) => {
      state.overlay = false;
    });
    builder.addCase(deleteTaskFetch.rejected, (state) => {
      state.overlay = false;
    });

    builder.addCase(editTaskFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(editTaskFetch.fulfilled, (state) => {
      state.overlay = false;
    });
    builder.addCase(editTaskFetch.rejected, (state) => {
      state.overlay = false;
    });
    builder.addCase(inviteUserFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(inviteUserFetch.rejected, (state, action) => {
      state.overlay = false;
      state.isErrorOrTrue = false;
      state.inviteUserError = action.payload!;
    });

    builder.addCase(uppdateUsersInBoard.fulfilled, (state, action) => {
      state.overlay = false;
      state.isErrorOrTrue = true;
      state.inviteUserError = action.payload;
    });
    builder.addCase(uppdateUsersInBoard.rejected, (state, action) => {
      state.overlay = false;
      state.isErrorOrTrue = false;
      state.inviteUserError = action.payload!;
    });
    builder.addCase(getTaskFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(getTaskFetch.fulfilled, (state) => {
      console.log('Задача получена fulfilled');
      state.overlay = false;
    });
    builder.addCase(getTaskFetch.rejected, (state) => {
      console.log('При получении задачи произошла ошибка rejected');
      state.overlay = false;
    });

    builder.addCase(getUsersFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(getUsersFetch.fulfilled, (state) => {
      console.log('Пользователи получены fulfilled');
      state.overlay = false;
    });
    builder.addCase(getUsersFetch.rejected, (state) => {
      console.log('При получении пользователей произошла ошибка rejected');
      state.overlay = false;
    });

    builder.addCase(getAllUserLoginFetch.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) state.usersLogins = { ...state.usersLogins, [payload.login]: payload._id };
    });
    builder.addCase(getAllUserLoginFetch.rejected, () => {
      alert('Загрузка пользователей не удалась');
    });

    builder.addCase(getAllBoardTasksFetch.pending, (state) => {
      console.log('получен массив всех задач');
      state.overlay = true;
    });
    builder.addCase(getAllBoardTasksFetch.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.overlay = false;
    });
    builder.addCase(getAllBoardTasksFetch.rejected, (state) => {
      state.overlay = false;
    });

    builder.addCase(MovingTheTask.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(uppdateOrdersColumns.pending, (state) => {
      state.overlay = true;
    });
  },
});

export default boardSlice.reducer;
