import React from 'react';
import './developer.scss';
import { DeveloperProp } from 'pages/welcome-page/interfaces/Interfaces';

const Developer = (props: DeveloperProp) => {
  return (
    <div className="developer">
      <div className="developer__intro">
        <div className="developer__img">
          <img src={props.img} className="developer__img-icon" />
        </div>
        <div className="developer__info">
          <h4 className="developer__name">{props.name}</h4>
          <h5 className="developer__title">{props.title}</h5>
        </div>
      </div>
      <p className="developer__description">{props.description}</p>
    </div>
  );
};

export default Developer;
