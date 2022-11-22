import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import './board-item.scss';
import { IBoardItemProps } from './interfaces/IBoardItemProps';
import { deleteBoardFetch } from '../../../store/actions-creators/boards/boards-action';

const BoardItem = (props: IBoardItemProps) => {
  const { boards } = useAppSelector((state) => state.boardListSlice);
  const { user } = useAppSelector((state) => state.signSlice);
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(deleteBoardFetch({ id: props.board._id }));
  };

  return (
    <div className="board-item">
      <div className="board-item__link">
        <div className="bord-item__icons">
          <div className="column__icon column__icon_bin" onClick={handleDelete} />
          <div className="column__icon column__icon_pen" />
        </div>
        <h3 className="board-item__title">{props.board.title}</h3>
      </div>
    </div>
  );
};

export default BoardItem;
