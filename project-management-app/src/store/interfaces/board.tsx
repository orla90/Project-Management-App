import { DraggableProvided } from 'react-beautiful-dnd';
import { Language } from 'pages/welcome-page/types/types';
import { Itasks } from 'pages/board-page/interfaces/task-interface';
export interface BoardsProps {
  title?: string;
  owner?: string;
  users?: [];
  lang?: Language;
}

export interface BoardProps extends BoardsProps {
  _id: string;
}

export interface ColumnProps {
  provided?: DraggableProvided;
  _id?: string;
  title?: string;
  order?: number;
  boardId?: string;
  lang?: Language;
  columns?: ColumnProps[] | [];
  tasks?: Itasks[];
}

export interface BoardWithColumnsProps {
  board: ColumnProps;
}

export interface IuppdateTitle {
  title: string;
  columnId: string;
  order: number;
  lang: Language;
}

export interface IdeleteColumn {
  columnId: string;
  guid?: string;
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
