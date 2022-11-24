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
    remove: 'Delete account',
    submit: 'Submit',
    close: 'Close',
    deleteUserTitle: 'Are you sure want delet youre accoutn?',
  },
  ru: {
    login: 'Логин',
    name: 'Имя',
    password: 'Пароль',
    questionUp: 'Уже есть аккаунт?',
    questionIn: `Ещё нет аккаунта?`,
    singIn: 'Войти',
    singUp: 'Регистрация',
    singEdit: 'Изменить профиль',
    change: 'Изменить',
    remove: 'Удалить аккаунт',
    submit: 'Подтвердить',
    close: 'Закрыть',
    deleteUserTitle: 'Ты точно хочешь удалить свой аккаунт?',
  },
};

export type key = keyof typeof i18ObjSign;
