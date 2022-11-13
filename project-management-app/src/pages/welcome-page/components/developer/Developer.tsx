import React from 'react';
import './developer.scss';
import ArtiomFoto from '../../../../assets/main-page/developers/artiom.png';
import DimaFoto from '../../../../assets/main-page/developers/dima.jpeg';
import LenaFoto from '../../../../assets/main-page/developers/lena.jpeg';
import OlyaFoto from '../../../../assets/main-page/developers/olya.jpg';
import { DeveloperProp } from 'pages/welcome-page/interfaces/Interfaces';

const Developer = (props: DeveloperProp) => {
  return (
    <div className="developer">
      <div className="developer__intro">
        <div className="developer__img">
          <img
            src={
              props.name === 'Artiom Savchuk' || props.name === 'Артем Савчук'
                ? ArtiomFoto
                : props.name === 'Dmitry Ostapchuk' || props.name === 'Дмитрий Остапчук'
                ? DimaFoto
                : props.name === 'Alena Staskevich' || props.name === 'Алена Стаскевич'
                ? LenaFoto
                : OlyaFoto
            }
            className="developer__img-icon"
          />
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
