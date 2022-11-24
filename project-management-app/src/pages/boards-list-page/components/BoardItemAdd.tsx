import NewBoardModal from 'components/UI/new-board/NewBoardModal';
import React, { useState } from 'react';
import './board-item.scss';

const BoardItemAdd = () => {
  const [newBoardModal, setNewBoardModal] = useState(false);

  return (
    <>
      <div className="board-item board-item-add" onClick={() => setNewBoardModal(true)}>
        <div className="board-item-add__icon">
          <svg
            style={{ color: 'blue' }}
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            {' '}
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              fill="blue"
            ></path>{' '}
          </svg>
        </div>
      </div>
      <NewBoardModal open={newBoardModal} onClose={() => setNewBoardModal(false)} />
    </>
  );
};

export default BoardItemAdd;
