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
import { i18ObjHeader, key } from 'texts/header/header-text';

const Header = () => {
  const { user } = useAppSelector((state) => state.signSlice);
  const { language } = useAppSelector((state) => state.languageSlice);
  const { setLanguage } = languageSlice.actions;
  const { removeUser, setLanguageSign } = signSlice.actions;
  const dispatch = useAppDispatch();
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

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
  }, [pathname, language]);

  const openHeaderMenu = () => {
    document.body.classList.toggle('_lock');
    setOpenMenu((prev) => !prev);
  };
  const closeHeaderMenuInLink = () => {
    if (openMenu === true) {
      setOpenMenu((prev) => !prev);
      document.body.classList.remove('_lock');
    }
  };

  const setEnLAnguage = () => {
    dispatch(setLanguage('en'));
    dispatch(setLanguageSign('en'));
  };
  const setRuLAnguage = () => {
    dispatch(setLanguage('ru'));
    dispatch(setLanguageSign('ru'));
  };

  const [newBoardModal, setNewBoardModal] = useState(false);

  const signOut = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
  };
  return (
    <header className={`header ${openMenu ? 'menu-open' : ''}`} ref={headerRef}>
      <div className="header__container">
        <nav className="header__body">
          <div className="header__logo">
            <CustomLink to={'/'}>{<Logo />}</CustomLink>
          </div>
          <div className="header__settings">
            <div className={`header__language ${language}`}>
              <button onClick={setEnLAnguage} className="header__en">
                EN
              </button>
              {' / '}
              <button onClick={setRuLAnguage} className="header__ru">
                RU
              </button>
            </div>
          </div>
          <div className="header__menu-body">
            <div className="header__overlay" onClick={openHeaderMenu}></div>
            <Logo />
            {user && (
              <ul className="header__menu">
                <li onClick={closeHeaderMenuInLink} className="header__menu-item">
                  <CustomLink className="header__menu-item-link" to={ROUTES.EDIT_PROFILE}>
                    {i18ObjHeader[language as key].editProfile}
                  </CustomLink>
                </li>
                <li onClick={closeHeaderMenuInLink} className="header__menu-item">
                  <CustomLink className="header__menu-item-link" to={ROUTES.BOARD}>
                    {i18ObjHeader[language as key].createBoard}
                  </CustomLink>
                </li>
                <li onClick={closeHeaderMenuInLink} className="header__menu-item">
                  <CustomLink className="header__menu-item-link" to={ROUTES.HOME}>
                    {i18ObjHeader[language as key].home}
                  </CustomLink>
                </li>
              </ul>
            )}
            {!user ? (
              <div className="header__sign-block">
                <div onClick={closeHeaderMenuInLink} className="header__sign-link">
                  <CustomLink className="header__btn main-page-btn" to={ROUTES.SIGN_IN}>
                    {i18ObjHeader[language as key].signIn}
                  </CustomLink>
                </div>
                <div onClick={closeHeaderMenuInLink} className="header__sign-link">
                  <CustomLink className="header__btn main-page-btn" to={ROUTES.SIGN_UP}>
                    {i18ObjHeader[language as key].signUp}
                  </CustomLink>
                </div>
              </div>
            ) : (
              <>
                <div className="header_create-btn">
                  <button className="main-page-btn" onClick={() => setNewBoardModal(true)}>
                    {i18ObjHeader[language as key].createBoard}
                  </button>
                </div>
                <NewBoardModal open={newBoardModal} onClose={() => setNewBoardModal(false)} />
                <button onClick={signOut} className="header__btn main-page-btn">
                  {i18ObjHeader[language as key].signOut}
                </button>
              </>
            )}
          </div>
          <button onClick={openHeaderMenu} type="button" className="icon-menu">
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
