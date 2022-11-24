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
