import React, { useEffect, useRef } from 'react';
import { CustomLink } from '../custom-link/CustomLink';
import Logo from './logo';
import './styles/logo.scss';
import './styles/header.scss';

const Header = () => {
  const headerRef = useRef(null);
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
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header__container">
        <div className="header__body">
          <div className="header__logo">
            <CustomLink to={'/'}>{<Logo />}</CustomLink>
          </div>
          <div className="header__sing-block">
            {
              //in the future, there will be a logic for rendering buttons (whether the user is authorized or not yet)
              <CustomLink className="main-page-btn" to={'/sing-in'}>
                Sing in
              </CustomLink>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
