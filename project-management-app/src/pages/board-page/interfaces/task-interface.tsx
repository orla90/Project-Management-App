import { Dispatch, SetStateAction } from 'react';

export interface Itasks {
  boardId: string;
  columnId: string;
  description: string;
  order: number;
  title: string;
  userId: string;
  users: [];
  _id: string;
}

export interface TaskWithProps {
  task: Itasks;
  columnId?: string;
  setTaskDetailedWindow?: Dispatch<SetStateAction<boolean>>;
  setEditTaskModal?: Dispatch<SetStateAction<boolean>>;
  setDeleteTaskModal?: Dispatch<SetStateAction<boolean>>;
  findUserLogin?: (userID: string, obj: { [x: string]: string }) => string;
}
export interface TaskUsersProps {
  _id: string;
  name?: string;
  login: string;
}
export interface TaskUsers extends TaskWithProps {
  users: Array<string>;
  setTaskOwnerUser: Dispatch<SetStateAction<string>>;
  setUserList: Dispatch<SetStateAction<boolean>>;
}
