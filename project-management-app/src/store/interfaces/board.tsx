import { Language } from 'pages/welcome-page/types/types';

export interface BoardsProps {
  title?: string;
  owner?: string;
  users?: [];
}

export interface BoardProps extends BoardsProps {
  _id: string;
}

export interface ColumnProps {
  _id?: string;
  title?: string;
  order?: number;
  boardId?: string;
  lang?: Language;
}

export interface BoardWithColumnsProps {
  board: ColumnProps;
}

export interface IuppdateTitle {
  title: string;
  columnId: string;
  order: number;
}

export interface IdeleteColumn {
  columnId: string;
}

export interface TaskDeleteParams extends IdeleteColumn {
  taskId: string;
}
export interface TaskChangeParams extends TaskDeleteParams {
  title: string;
  order: number;
  description: string;
  taskId: string;
  userId?: string;
  users?: string[];
}

export interface UserProps {
  _id?: string;
  name?: string;
  login?: string;
}
