import { Language } from 'pages/welcome-page/types/types';

export interface IUpdateBoardProps {
  _id: string;
  title: {
    title: string;
    description: string;
  };
  owner: string;
  users: string[];
  lang: Language;
}

export interface IUpdateBoardPropsWithoutDescription {
  _id: string;
  title: string;
  owner: string;
  users: string[];
  lang: Language;
}
