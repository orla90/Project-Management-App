import React from 'react';
import { CustomButtonModel } from './CustomButtonModel';

export const CustomButton = ({ children, className, onClick }: CustomButtonModel) => {
  return (
    <button className={className ? className : ''} onClick={onClick}>
      {children}
    </button>
  );
};
