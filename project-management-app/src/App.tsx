import { Layout } from 'components/layout/Layout';
import { ROUTES } from 'constants/routes';
import Board from 'pages/board-page/components/board';
import BoardList from 'pages/boards-list-page/components/board-list';
import EditProfile from 'pages/sing-pages/EditProfile';
import ErrorPage from 'pages/error-page/components/error';
import SignIn from 'pages/sing-pages/SingIn';
import SignUp from 'pages/sing-pages/SingUp';
import UserAuth from 'pages/user-auth-page/components/auth';
import WelcomePage from 'pages/welcome-page/components/WelcomePage';

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
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
