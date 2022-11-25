import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/error-page/translate';
import './error-page.scss';

const ErrorPage = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <div className="error-page__container">
      <div className="error-page__content">
        <div className="error-page__img-wrapper">
          <div className="error-page__img error-page__img_cry"></div>
        </div>
        <div className="error-page__description">
          <div className="error-page__text-wrapper">
            <h2 className="error-page__text error-page__text_title">{i18Obj[lang].ooops}</h2>
            <h2 className="error-page__text error-page__text_subtitle">{i18Obj[lang].notFound}</h2>
            <div className="error-page__btn-wrapper">
              <CustomLink to="/" className="main-page-btn error-page__btn">
                {i18Obj[lang].goHome}
              </CustomLink>
            </div>
          </div>
          <div className="error-page__img error-page__img_404"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
