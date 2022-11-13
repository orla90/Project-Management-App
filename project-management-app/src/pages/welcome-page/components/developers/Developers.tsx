import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import './developers.scss';
import i18Obj from '../../../../texts/welcome-page/translate';
import Developer from '../developer/Developer';

const Developers = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const developers = i18Obj[lang].developers.map((developer) => (
    <Developer
      key={developer.name}
      name={developer.name}
      title={developer.title}
      description={developer.description}
      img={developer.img}
    />
  ));

  return (
    <article className="developers">
      <div className="developers__container">
        <h2 className="developers__title">{i18Obj[lang].team}</h2>
        <div className="developers__list">{developers}</div>
      </div>
    </article>
  );
};

export default Developers;
