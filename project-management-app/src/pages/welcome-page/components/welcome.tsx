import { CustomLink } from 'components/UI/custom-link/CustomLink';
import React from 'react';
import './welcom-page.scss';

const Welcome = () => {
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
          <CustomLink className="welcom-page__btn main-page-btn" to={'/sing-in'}>
            Get start
          </CustomLink>
        </div>
      </div>
    </article>
  );
};

export default Welcome;
