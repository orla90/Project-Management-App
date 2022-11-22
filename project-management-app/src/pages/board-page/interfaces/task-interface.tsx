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
}
