import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import './board-list.scss';
import BoardItemAdd from './BoardItemAdd';
import { getBoardsByUserIdFetch } from '../../../store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IBoard } from './interfaces/IBoard';

const BoardList = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const { user } = useAppSelector((state) => state.signSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const userBoards = await dispatch(getBoardsByUserIdFetch({ userId: user!.id })).unwrap();
        setBoards(userBoards);
      } catch (error) {
        alert(error);
      }
    };
    loadBoards();
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
