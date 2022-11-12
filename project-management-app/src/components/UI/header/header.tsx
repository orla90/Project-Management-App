import React, { useEffect, useRef } from 'react';
import { CustomLink } from '../custom-link/CustomLink';
import Logo from './logo';
import './styles/logo.scss';
import './styles/header.scss';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { signSlice } from 'store/slices/sign-slice';
import { ROUTES } from 'constants/routes';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { user } = useAppSelector((state) => state.signSlice);
  const dispatch = useAppDispatch();
  const { removeUser } = signSlice.actions;
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    window.onscroll = () => {
      const header = headerRef.current;
      if (header) {
        if (window.scrollY >= 1 && !(header as HTMLElement).classList.contains('scroll')) {
          (header as HTMLElement).classList.add('scroll');
        } else if (window.scrollY === 0 && (header as HTMLElement).classList.contains('scroll')) {
          (header as HTMLElement).classList.remove('scroll');
        }
      }
    };
  }, [pathname]);

  const signOut = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
  };
  return (
    <header className="header" ref={headerRef}>
      <div className="header__container">
        <div className="header__body">
          <div className="header__logo">
            <CustomLink to={'/'}>{<Logo />}</CustomLink>
          </div>
          <div className="header__sign-block">
            {!user ? (
              pathname == '/' + ROUTES.SIGN_IN || pathname == '/' + ROUTES.SIGN_UP ? (
                <CustomLink className="main-page-btn" to={ROUTES.HOME}>
                  Home
                </CustomLink>
              ) : (
                <>
                  <CustomLink className="main-page-btn" to={ROUTES.SIGN_IN}>
                    sign in
                  </CustomLink>

                  <CustomLink className="main-page-btn" to={ROUTES.SIGN_UP}>
                    sign up
                  </CustomLink>
                </>
              )
            ) : (
              <div onClick={signOut} className="main-page-btn">
                Sign out
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
