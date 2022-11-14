import { AppDispatch } from 'store/types/types-redux';

export interface IeditProfileProps {
  login: string;
  name: string;
  password: string;
  id: number;
  token: string;
  dispatch: AppDispatch;
}
