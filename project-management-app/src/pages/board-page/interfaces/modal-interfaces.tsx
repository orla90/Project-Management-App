import { ReactNode } from 'react';

export interface CustomBoardModalProps {
  children?: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export interface BoardFormModalProps {
  onClose: () => void;
  description?: boolean;
  target: string;
}
