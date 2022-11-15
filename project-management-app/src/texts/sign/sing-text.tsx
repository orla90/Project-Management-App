export const i18ObjSign = {
  en: {
    login: 'Login',
    name: 'Name',
    password: 'Password',
    questionUp: 'Already have an account?',
    questionIn: `Don't have an account?`,
    singIn: 'Sign in',
    singUp: 'Sign up',
    singEdit: 'Edit profile',
    change: 'Сhange',
    error: {
      required: 'Required',
      leastCharacters: 'at least 8 characters',
      tooShort: 'Too short',
      onlyLatine: 'only latin letters',
      and: 'and',
    },
  },
  ru: {
    login: 'Логин',
    name: 'Имя',
    password: 'Пароль',
    questionUp: 'Уже есть аккаунт?',
    questionIn: `Ещё нет аккаунта?`,
    singIn: 'Войти',
    singUp: 'Регистрация',
    singEdit: 'Изменить профииль',
    change: 'Изменить',
    error: {
      required: 'Обязательное поле',
      leastCharacters: 'Не менее 8 символов',
      tooShort: 'Очень коротко',
      onlyLatine: 'только латинские буквы',
      and: 'и',
    },
  },
};

export type key = keyof typeof i18ObjSign;
