import { CustomLink } from 'components/UI/custom-link/CustomLink';
import React from 'react';
import './welcome.scss';

const Welcome = () => {
  return (
    <article className="welcome">
      <div className="welcome__container">
        <div className="welcome__body">
          <h1 className="welcome__title">Let us handle your project with precision and speed</h1>
          <h3 className="welcome__sub-title">
            We take the burden off your shoulders so you can focus on the more
          </h3>
          <CustomLink className="welcome__btn main-page-btn" to={'/sing-in'}>
            Get start
          </CustomLink>
        </div>
      </div>
    </article>
  );
};

export default Welcome;
