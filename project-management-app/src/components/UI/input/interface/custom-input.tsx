import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface IcustomInput {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  customClass?: string;
  propsForm: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  showErrorFn: (errors: FieldErrors, name: string, lang: string) => string;
  errors: FieldErrors;
  language: 'en' | 'ru';
}
