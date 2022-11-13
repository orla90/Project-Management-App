import React, { useEffect, useRef, useState } from 'react';
import { CustomLink } from '../custom-link/CustomLink';
import Logo from './logo';
import './styles/logo.scss';
import './styles/header.scss';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { signSlice } from 'store/slices/sign-slice';
import { ROUTES } from 'constants/routes';
import { useLocation } from 'react-router-dom';
import { languageSlice } from 'store/slices/language-slice';
import NewBoardModal from '../new-board/NewBoardModal';

const Header = () => {
  const { user } = useAppSelector((state) => state.signSlice);
  const { language } = useAppSelector((state) => state.languageSlice);
  const { setLanguage } = languageSlice.actions;
  const { removeUser } = signSlice.actions;
  const dispatch = useAppDispatch();
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

  const setEnLAnguage = () => dispatch(setLanguage('en'));
  const setRuLAnguage = () => dispatch(setLanguage('ru'));

  const [newBoardModal, setNewBoardModal] = useState(false);

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
          <div className="header__menu-body">
            <div className={`header__language ${language}`}>
              <span onClick={setEnLAnguage} className="header__en">
                EN
              </span>
              {' / '}
              <span onClick={setRuLAnguage} className="header__ru">
                RU
              </span>
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
                <>
                  <div className="header_create-btn">
                    <button className="main-page-btn" onClick={() => setNewBoardModal(true)}>
                      CREATE BOARD
                    </button>
                  </div>
                  <NewBoardModal open={newBoardModal} onClose={() => setNewBoardModal(false)} />
                  <div onClick={signOut} className="main-page-btn">
                    Sign out
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
