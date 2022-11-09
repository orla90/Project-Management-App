import { ReactNode } from 'react';

export interface CustomLinkModel {
  children: ReactNode;
  to: string;
  onClick?: () => void;
}
