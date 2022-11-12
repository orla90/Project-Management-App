import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import './welcom-page.scss';

const Welcome = () => {
  const { user } = useAppSelector((state) => state.signSlice);

  return (
    <article className="welcom-page">
      <div className="welcom-page__container">
        <div className="welcom-page__body">
          <h1 className="welcom-page__title">
            Let us handle your project with precision and speed
          </h1>
          <h2 className="welcom-page__sub-title">
            We take the burden off your shoulders so you can focus on the more
          </h2>
          {!user ? (
            <CustomLink className="welcom-page__btn main-page-btn" to={ROUTES.SIGN_IN}>
              Get start
            </CustomLink>
          ) : (
            <CustomLink className="welcom-page__btn main-page-btn" to={ROUTES.BOARDS_LIST}>
              Boards-list
            </CustomLink>
          )}
        </div>
      </div>
    </article>
  );
};

export default Welcome;
