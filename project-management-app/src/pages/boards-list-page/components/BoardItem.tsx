import React, { useState } from 'react';
import './board-item.scss';
import { IBoardItemProps } from './interfaces/IBoardItemProps';
import { boardSlice } from 'store/slices/board-slice';
import DeleteBoardModal from './DeleteBoardModal';
import UpdateBoardModal from './UpdateBoardModal';
import { useAppDispatch } from 'store/custom-hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const BoardItem = (props: IBoardItemProps) => {
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);
  const [updateBoardModal, setUpdateBoardModal] = useState(false);

  const dispatch = useAppDispatch();
  const { setBoard } = boardSlice.actions;
  const navigate = useNavigate();

  const getBoard = (board: IBoardItemProps) => {
    dispatch(setBoard(board));
    navigate(`../${ROUTES.BOARD}`);
  };

  return (
    <>
      <div className="board-item" onClick={() => getBoard(props)}>
        <div className="board-item__link">
          <div className="bord-item__icons">
            <div
              className="column__icon column__icon_bin"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                setDeleteBoardModal(true);
              }}
            />
            <div
              className="column__icon column__icon_pen"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                setUpdateBoardModal(true);
              }}
            />
          </div>
          <h3 className="board-item__title">{props.board.title}</h3>
        </div>
      </div>
      <DeleteBoardModal
        open={deleteBoardModal}
        onClose={() => setDeleteBoardModal(false)}
        id={props.board._id}
      />
      <UpdateBoardModal
        open={updateBoardModal}
        onClose={() => setUpdateBoardModal(false)}
        board={props.board}
      />
    </>
  );
};

export default BoardItem;
