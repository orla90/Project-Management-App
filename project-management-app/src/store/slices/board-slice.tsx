import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from 'pages/boards-list-page/components/interfaces/IBoard';
import {
  createColumnFetch,
  deleteColumnFetch,
  getBoardFetch,
  getColumnsFetch,
  uppdateOrdersColumns,
} from 'store/actions-creators/board/board-action';
import { MovingTheTask } from 'store/actions-creators/board/dnd-actions';
import { dataTasks } from 'store/actions-creators/board/sort-data-all-tasks-fn';
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
  board: null as IBoard | null,
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
    setNewOrdersTasks: (state, action: PayloadAction<{ [x: string]: Array<dataTasks> }>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardFetch.fulfilled, (state, action) => {
      state.board = action.payload;
    });

    builder.addCase(getColumnsFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(getColumnsFetch.fulfilled, (state, action) => {
      state.columnOrder = action.payload.length;
      state.columns = action.payload;
      state.overlay = false;
    });
    builder.addCase(getColumnsFetch.rejected, (state) => {
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
    builder.addCase(getTasksColumnFetch.fulfilled, (state) => {
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
      state.overlay = false;
    });
    builder.addCase(getTaskFetch.rejected, (state) => {
      state.overlay = false;
    });

    builder.addCase(getUsersFetch.pending, (state) => {
      state.overlay = true;
    });
    builder.addCase(getUsersFetch.fulfilled, (state) => {
      state.overlay = false;
    });
    builder.addCase(getUsersFetch.rejected, (state) => {
      state.overlay = false;
    });

    builder.addCase(getAllUserLoginFetch.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) state.usersLogins = { ...state.usersLogins, [payload.login]: payload._id };
    });

    builder.addCase(getAllBoardTasksFetch.pending, (state) => {
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
    builder.addCase(uppdateOrdersColumns.fulfilled, (state) => {
      state.overlay = false;
    });
    builder.addCase(uppdateOrdersColumns.rejected, (state) => {
      state.overlay = false;
    });
  },
});

export default boardSlice.reducer;
