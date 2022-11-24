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

export interface TaskProps {
  title: string;
  description: string;
  taskId: string;
  columnId: string;
  order: number;
  userId: string;
  users: string[];
}
export interface TaskUsersProps {
  _id: string;
  name?: string;
  login: string;
}
export interface TaskUsers {
  users: Array<string>;
  setTaskOwnerUser: Dispatch<SetStateAction<string>>;
  setUserList: Dispatch<SetStateAction<boolean>>;
  task: TaskProps;
}
