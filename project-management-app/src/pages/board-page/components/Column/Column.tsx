import { CustomButton } from 'components/UI/button/CustomButton';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import Task from '../Task/Task';
import './column.scss';

const Column = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <div className="column">
      <div className="column__info">
        <div className="column__icon column__icon_pen" />
        <h3 className="column__title">Title</h3>
        <div className="column__icon column__icon_bin" />
      </div>
      <div className="column__content">
        <Task />
      </div>
      <div className="column__btn">
        <CustomButton className="main-page-btn">{i18Obj[lang].task}</CustomButton>
      </div>
    </div>
  );
};

export default Column;
