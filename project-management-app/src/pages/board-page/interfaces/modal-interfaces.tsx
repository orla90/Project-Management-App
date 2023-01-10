import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Itasks } from './task-interface';

export interface CustomBoardModalProps {
  children?: ReactNode;
  open: boolean;
  title: string;
  columnId: string;
  taskId?: string;
  onClose: () => void;
  target: string;
  setTasks?: Dispatch<SetStateAction<Itasks[]>>;
}

export interface BoardFormModalProps {
  order?: number;
  columnId?: string;
  onClose: () => void;
  description?: boolean;
  target: string;
  task?: Itasks;
}
