import { ReactNode } from 'react';

export interface CustomBoardModalProps {
  children?: ReactNode;
  open: boolean;
  title: string;
  columnId: string;
  onClose: () => void;
}

export interface BoardFormModalProps {
  columbId?: string;
  onClose: () => void;
  description?: boolean;
  target: string;
}
