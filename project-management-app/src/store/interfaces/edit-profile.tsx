import { Language } from 'pages/welcome-page/types/types';
import { AppDispatch } from 'store/types/types-redux';

export interface IeditProfileProps {
  login: string;
  name: string;
  password: string;
  id: string;
  token: string;
  dispatch: AppDispatch;
  lang: Language;
}
