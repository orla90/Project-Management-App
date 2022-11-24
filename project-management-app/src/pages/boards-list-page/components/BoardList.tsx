import React, { useEffect } from 'react';
import BoardItem from './BoardItem';
import './board-list.scss';
import BoardItemAdd from './BoardItemAdd';
import { getBoardsByUserIdFetch } from '../../../store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';

const BoardList = () => {
  const { boards } = useAppSelector((state) => state.boardListSlice);
  const { user } = useAppSelector((state) => state.signSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUserIdFetch({ userId: user!.id }));
  }, [dispatch, user]);

  return (
    <div className="board-list-container">
      {boards.map((board) => (
        <BoardItem board={board} key={board._id} />
      ))}
      <BoardItemAdd />
    </div>
  );
};

export default BoardList;
