import { DraggableProvided } from 'react-beautiful-dnd';
import { Language } from 'pages/welcome-page/types/types';
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
  lang: Language;
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
