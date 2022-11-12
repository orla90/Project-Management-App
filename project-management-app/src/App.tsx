import { Layout } from 'components/layout/Layout';
import { ROUTES } from 'constants/routes';
import WelcomePage from 'pages/welcome-page/components/WelcomePage';
import Board from 'pages/board-page/components/Board';
import BoardList from 'pages/boards-list-page/components/Board-list';
import ErrorPage from 'pages/error-page/components/Error';
import SignIn from 'pages/sing-pages/sing-in';
import SignUp from 'pages/sing-pages/sing-up';
import UserAuth from 'pages/user-auth-page/components/Auth';
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setupStore } from 'store/store';
import './global-style.scss';

const store = setupStore();

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Provider store={store}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path={ROUTES.BOARDS_LIST} element={<BoardList />} />
            <Route path={ROUTES.BOARD} element={<Board />} />
            <Route path={ROUTES.AUTH} element={<UserAuth />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
