import React from 'react';
import { IcustomInput } from './interface/custom-input';
import './styles/custom-input.scss';
const CustomInput = ({
  label,
  type,
  name,
  id,
  customClass,
  placeholder,
  propsForm,
  showErrorFn,
  errors,
  language,
}: IcustomInput) => {
  return (
    <div className="custom-form__input-body">
      <label htmlFor="id" className="custom-form__label">
        {label}
      </label>
      <input
        {...propsForm}
        type={type}
        autoComplete={type === 'password' ? 'yes' : 'no'}
        className={customClass ? customClass : ''}
        placeholder={placeholder ? placeholder : ''}
        name={name}
        id={id}
      />
      <div className="custom-form__error">{showErrorFn(errors, name, language)}</div>
    </div>
  );
};

export default CustomInput;
