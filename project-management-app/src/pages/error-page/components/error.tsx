import { CustomLink } from 'components/UI/custom-link/CustomLink';
import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ paddingTop: '150px', textAlign: 'center' }}>
      <CustomLink to="/">Home</CustomLink>
      <h1>404</h1>
    </div>
  );
};

export default ErrorPage;
