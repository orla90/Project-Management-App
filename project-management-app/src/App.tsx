import { Layout } from 'components/layout/Layout';
import { ROUTES } from 'constants/routes';
import Board from 'pages/board-page/components/Board';
import BoardList from 'pages/boards-list-page/components/Board-list';
import ErrorPage from 'pages/error-page/components/Error';
import UserAuth from 'pages/user-auth-page/components/Auth';
import WelcomePage from 'pages/welcome-page/components/WelcomePage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './global-style.scss';

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path={ROUTES.BOARDS_LIST} element={<BoardList />} />
          <Route path={ROUTES.BOARD} element={<Board />} />
          <Route path={ROUTES.AUTH} element={<UserAuth />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
