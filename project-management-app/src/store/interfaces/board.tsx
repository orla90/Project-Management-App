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
