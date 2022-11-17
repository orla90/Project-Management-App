import { ReactNode } from 'react';

export interface CustomBoardModalProps {
  children?: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export interface TaskEditModalProps {
  onClose: () => void;
}
