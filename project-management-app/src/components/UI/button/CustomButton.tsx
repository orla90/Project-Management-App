import React from 'react';
import { CustomButtonModel } from './CustomButtonModel';

export const CustomButton = ({ children, className, onClick, disabled }: CustomButtonModel) => {
  return (
    <button className={className ? className : ''} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
