import React from 'react';
import './developer.scss';
import ArtiomFoto from '../../../../assets/main-page/developers/artiom.png';
import DimaFoto from '../../../../assets/main-page/developers/dima.jpeg';
import LenaFoto from '../../../../assets/main-page/developers/lena.jpeg';
import OlyaFoto from '../../../../assets/main-page/developers/olya.jpg';

interface DeveloperProp {
  name: string;
  title: string;
  foto: string;
  description: string;
}

const Developer = (props: DeveloperProp) => {
  return (
    <div className="developer">
      <div className="developer__intro">
        <div className="developer__img">
          <img
            src={
              props.foto === 'Artiom'
                ? ArtiomFoto
                : props.foto === 'Dima'
                ? DimaFoto
                : props.foto === 'Lena'
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
