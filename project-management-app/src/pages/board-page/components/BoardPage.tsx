import { CustomButton } from 'components/UI/button/CustomButton';
import React from 'react';
import './board-page.scss';
import Column from './Column/Column';

const BoardPage = () => {
  return (
    <article className="board">
      <div className="board__container">
        <CustomButton className="main-page-btn">+ Add item</CustomButton>
        <Column />
      </div>
    </article>
  );
};

export default BoardPage;
