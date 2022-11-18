import { AppDispatch } from 'store/types/types-redux';

export interface IsignProps {
  login: string;
  name?: string;
  password: string;
  dispatch?: AppDispatch;
}
