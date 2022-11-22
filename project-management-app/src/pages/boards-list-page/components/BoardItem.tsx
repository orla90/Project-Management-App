import React from 'react';
import { useAppDispatch } from 'store/custom-hooks';
import './board-item.scss';
import { IBoardItemProps } from './interfaces/IBoardItemProps';
import { boardSlice } from 'store/slices/board-slice';
import { useNavigate } from 'react-router';
import { ROUTES } from 'constants/routes';

const BoardItem = (props: IBoardItemProps) => {
  const dispatch = useAppDispatch();
  const { setBoard } = boardSlice.actions;
  const navigate = useNavigate();

  const getBoard = (board: IBoardItemProps) => {
    dispatch(setBoard(board));
    navigate(`../${ROUTES.BOARD}`);
  };

  return (
    <div className="board-item" onClick={() => getBoard(props)}>
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
