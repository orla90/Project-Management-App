import React, { useState } from 'react';
import './board-item.scss';
import { IBoardItemProps } from './interfaces/IBoardItemProps';
import DeleteBoardModal from './DeleteBoardModal';
import UpdateBoardModal from './UpdateBoardModal';

const BoardItem = (props: IBoardItemProps) => {
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);
  const [updateBoardModal, setUpdateBoardModal] = useState(false);

  return (
    <>
      <div className="board-item">
        <div className="board-item__link">
          <div className="bord-item__icons">
            <div
              className="column__icon column__icon_bin"
              onClick={() => setDeleteBoardModal(true)}
            />
            <div
              className="column__icon column__icon_pen"
              onClick={() => setUpdateBoardModal(true)}
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
