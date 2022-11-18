import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import { i18ObjGeneral, key } from 'texts/welcome-page/general-page';
import './welcome.scss';

const Welcome = () => {
  const { user } = useAppSelector((state) => state.signSlice);
  const { language } = useAppSelector((state) => state.languageSlice);
  return (
    <article className="welcome">
      <div className="welcome__container">
        <div className="welcome__body">
          <h1 className="welcome__title">{i18ObjGeneral[language as key].title}</h1>
          <h3 className="welcome__sub-title">{i18ObjGeneral[language as key].subTitle}</h3>
          {!user ? (
            <CustomLink className="welcome-page__btn main-page-btn" to={ROUTES.SIGN_IN}>
              {i18ObjGeneral[language as key].buttonWithoutAuthorization}
            </CustomLink>
          ) : (
            <CustomLink className="welcome-page__btn main-page-btn" to={ROUTES.BOARDS_LIST}>
              {i18ObjGeneral[language as key].buttonWithAuthorization}
            </CustomLink>
          )}
        </div>
      </div>
    </article>
  );
};

export default Welcome;
