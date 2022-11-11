import { FieldErrorsImpl } from 'react-hook-form';

export const setErrorLogin = (value: string) => {
  const minLength = value.length >= 2 || 'too short';
  const onlyLatine = /^[a-zA-Z]/.test(value) || 'only latin letters';
  if (minLength === true && onlyLatine === true) return true;
  return `${minLength !== true ? minLength : ''} ${
    onlyLatine !== true && minLength !== true ? 'and' : ''
  } ${onlyLatine !== true ? onlyLatine : ''}`;
};

export const setErrorEmail = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? true : 'not valid email';
};

export const setErrorPassword = (value: string) => {
  return value.length > 7 ? true : 'at least 8 characters';
};

export const showError = (
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >,
  name: string
): string => {
  const error = errors[name] ? errors[name]?.message || 'required' : '';
  return error as string;
};
