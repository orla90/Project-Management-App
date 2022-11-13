import React from 'react';
import Feature from '../feature/Feature';
import './features.scss';
import i18Obj from '../../../../texts/welcome-page/translate';
import { useAppSelector } from 'store/custom-hooks';
import { Language } from 'pages/welcome-page/types/types';

const Features = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <article className="features">
      <div className="features__container">
        <h2 className="features__title">{i18Obj[lang].features}</h2>
        <div className="features__list">
          <Feature
            title={i18Obj[lang].interface.title}
            description={i18Obj[lang].interface.description}
          />
          <Feature
            title={i18Obj[lang].reconfiguration.title}
            description={i18Obj[lang].reconfiguration.description}
          />
          <Feature
            title={i18Obj[lang].search.title}
            description={i18Obj[lang].search.description}
          />
        </div>
      </div>
    </article>
  );
};

export default Features;
