import { string } from 'prop-types';

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
