import { Layout } from 'components/layout/Layout';
import { ROUTES } from 'constants/routes';
import Board from 'pages/board-page/components/board';
import BoardList from 'pages/boards-list-page/components/board-list';
import ErrorPage from 'pages/error-page/components/error';
import SingIn from 'pages/sing-pages/sing-in';
import SingUp from 'pages/sing-pages/sing-up';
import UserAuth from 'pages/user-auth-page/components/auth';
import Welcome from 'pages/welcome-page/components/welcome';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './global-style.scss';

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path={ROUTES.BOARDS_LIST} element={<BoardList />} />
          <Route path={ROUTES.BOARD} element={<Board />} />
          <Route path={ROUTES.AUTH} element={<UserAuth />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.SING_IN} element={<SingIn />} />
          <Route path={ROUTES.SING_UP} element={<SingUp />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
