import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import { i18ObjFooter, key } from 'texts/footer/footer-text';
import './style/footer.scss';
const Footer = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__body">
          <div className="footer__item">
            <a rel="noreferrer" target={'_blank'} href="https://rs.school/react/">
              <span className="footer__logo"></span>
            </a>
          </div>
          <div className="footer__item">
            <span>2022</span>
          </div>
          <div className="footer__item">
            <ul className="footer__list">
              {i18ObjFooter[language as key].map((a) => {
                return (
                  <li key={a.name + a.url} className="footer__list-item">
                    <a rel="noreferrer" target={'_blank'} href={a.url}>
                      {a.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
