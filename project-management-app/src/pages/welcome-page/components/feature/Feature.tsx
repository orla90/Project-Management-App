import { FeatureProp } from 'pages/welcome-page/interfaces/Interfaces';
import React from 'react';
import './feature.scss';

const Feature = (props: FeatureProp) => {
  return (
    <div className="feature">
      <div className="feature__img" />
      <h4 className="feature__title">{props.title}</h4>
      <p className="feature__description">{props.description}</p>
    </div>
  );
};

export default Feature;
