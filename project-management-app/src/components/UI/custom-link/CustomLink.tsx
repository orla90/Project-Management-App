import { CustomLinkModel } from 'components/UI/custom-link/CustomLinkModel';
import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = ({ children, to, className }: CustomLinkModel) => {
  return (
    <Link className={className ? className : ''} to={to}>
      {children}
    </Link>
  );
};
