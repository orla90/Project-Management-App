import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import './welcome.scss';

const Welcome = () => {
  const { user } = useAppSelector((state) => state.signSlice);

  return (
    <article className="welcome">
      <div className="welcome__container">
        <div className="welcome__body">
          <h1 className="welcome__title">Let us handle your project with precision and speed</h1>
          <h3 className="welcome__sub-title">
            We take the burden off your shoulders so you can focus on the more
          </h3>
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
