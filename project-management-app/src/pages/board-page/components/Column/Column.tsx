import { CustomButton } from 'components/UI/button/CustomButton';
import React from 'react';
import Task from '../Task/Task';
import './column.scss';

const Column = () => {
  return (
    <div className="column">
      <div className="column__info">
        <div className="column__icon column__icon_pen" />
        <h3 className="column__title">Title</h3>
        <div className="column__icon column__icon_bin" />
      </div>
      <div className="column__content">
        <Task />
        <Task />
      </div>
      <div className="column__btn">
        <CustomButton className="main-page-btn center">+ Add task</CustomButton>
      </div>
    </div>
  );
};

export default Column;
