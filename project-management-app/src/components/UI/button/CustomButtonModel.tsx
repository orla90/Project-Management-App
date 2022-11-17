import { ReactNode } from 'react';

export interface CustomButtonModel {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
