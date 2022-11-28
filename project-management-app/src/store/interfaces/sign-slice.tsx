import { Language } from 'pages/welcome-page/types/types';

export interface IsignInitialState {
  user: Iuser | null;
  errorRegistration: { en: string; ru: string };
  errorLogin: { en: string; ru: string };
  editMessage: { en: string; ru: string };
  trueOrfalseEdit: false | true;
  overlay: false | true;
  language: 'ru' | 'en';
}

export interface Iuser {
  id: string;
  login: string;
  iat: number;
  exp: number;
  token: string;
}

export interface IuserAndLang {
  user: Iuser | null;
  lang: Language;
}
