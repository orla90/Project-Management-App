import { ReactNode } from 'react';

export interface CustomLinkModel {
  children: ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}
