import React from 'react';
import { CustomButtonModel } from './CustomButtonModel';

export const CustomButton = ({ children, className }: CustomButtonModel) => {
  return <button className={className ? className : ''}>{children}</button>;
};
