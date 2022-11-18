import React from 'react';
import './board-item.scss';

const BoardItem = () => {
  return (
    <div className="board-item">
      <a className="board-item__link">
        <h3 className="board-item__title">Title</h3>
        <p className="board-item__description">This is a description of the task</p>
        <div className="bord-item__icons">
          <div className="column__icon column__icon_bin" />
          <div className="column__icon column__icon_pen" />
        </div>
      </a>
    </div>
  );
};

export default BoardItem;
