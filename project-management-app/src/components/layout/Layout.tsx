//import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Header from 'components/UI/header/header';
//import { ROUTES } from 'constants/routes';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>2022</footer>
    </div>
  );
};
