import { CustomLinkModel } from 'components/UI/custom-link/CustomLinkModel';
import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = ({ children, to }: CustomLinkModel) => {
  return <Link to={to}>{children}</Link>;
};
