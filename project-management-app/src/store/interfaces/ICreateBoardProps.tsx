import { Language } from 'pages/welcome-page/types/types';

export interface ICreateBoardProps {
  title: {
    title: string;
    description: string;
  };
  owner: string;
  users: [];
  lang: Language;
}
