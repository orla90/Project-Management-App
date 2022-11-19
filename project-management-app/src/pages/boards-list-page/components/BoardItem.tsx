import React from 'react';
import './board-item.scss';
import { IBoardItemProps } from './interfaces/IBoardItemProps';

const BoardItem = (props: IBoardItemProps) => {
  return (
    <div className="board-item">
      <div className="board-item__link">
        <div className="bord-item__icons">
          <div className="column__icon column__icon_bin" />
          <div className="column__icon column__icon_pen" />
        </div>
        <h3 className="board-item__title">{props.board.title}</h3>
      </div>
    </div>
  );
};

export default BoardItem;
