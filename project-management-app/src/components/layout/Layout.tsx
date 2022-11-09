import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header>
        <CustomLink to={ROUTES.HOME}>Home</CustomLink>
        <CustomLink to={ROUTES.BOARDS_LIST}>Boards</CustomLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>2022</footer>
    </div>
  );
};
