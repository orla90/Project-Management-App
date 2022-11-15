import { FieldErrors } from './types/errors-type';

export const setErrorNameOrLogin = (value: string) => {
  const minLength = value.length >= 2;
  const onlyLatine = /^[a-zA-Z]/.test(value);
  if (minLength === true && onlyLatine === true) return true;
  if (minLength === false && onlyLatine === true)
    return JSON.stringify({ en: 'Too short', ru: 'Очень коротко' });
  if (minLength === true && onlyLatine === false)
    return JSON.stringify({
      en: 'Only latin letters',
      ru: 'Поле должно содержать только латинские буквы',
    });
  if (minLength === false && onlyLatine === false)
    return JSON.stringify({
      en: 'Too short and only latin letters',
      ru: 'Слишком коротко, поле должно содержать только латинские буквы',
    });
};

export const setErrorPassword = (value: string) => {
  return value.length > 7
    ? true
    : JSON.stringify({ en: 'at least 8 characters', ru: 'Не менее 8 символов' });
};

export const showError = (errors: FieldErrors, name: string, lang: string): string => {
  const message = errors[name]
    ? errors[name].message
      ? JSON.parse(errors[name].message)[lang]
      : lang === 'en'
      ? 'Required'
      : 'Обязательное поле'
    : '';

  return message as string;
};
