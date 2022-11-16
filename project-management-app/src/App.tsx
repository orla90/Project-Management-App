import { Layout } from 'components/layout/Layout';
import { ROUTES } from 'constants/routes';
import WelcomePage from 'pages/welcome-page/components/WelcomePage';
import BoardPage from 'pages/board-page/components/BoardPage';
import BoardList from 'pages/boards-list-page/components/BoardList';
import ErrorPage from 'pages/error-page/components/Error';
import EditProfile from 'pages/sing-pages/edit-profile';
import SignIn from 'pages/sing-pages/sing-in';
import SignUp from 'pages/sing-pages/sing-up';
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setupStore } from 'store/store';
import './global-style.scss';
import UserAuth from 'pages/user-auth-page/components/Auth';

const store = setupStore();

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Provider store={store}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path={ROUTES.BOARDS_LIST} element={<BoardList />} />
            <Route path={ROUTES.BOARD} element={<BoardPage />} />
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
