import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import './board-list.scss';
import BoardItemAdd from './BoardItemAdd';
import { getBoardsByUserIdFetch } from '../../../store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IBoard } from './interfaces/IBoard';
import { io } from 'socket.io-client';
import Overlay from 'components/UI/overlay/Overlay';

const BoardList = () => {
  const [allBoards, setBoards] = useState<IBoard[]>([]);
  const [overlay, setOverlay] = useState(false);
  const { user } = useAppSelector((state) => state.signSlice);
  const { boards } = useAppSelector((state) => state.boardListSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadBoards = async () => {
      setOverlay(true);
      try {
        const userBoards = await dispatch(getBoardsByUserIdFetch({ userId: user!.id })).unwrap();
        setBoards(userBoards);
      } catch (error) {
        alert(error);
      } finally {
        setOverlay(false);
      }
    };
    const socket = io('https://react-final-project-production.up.railway.app/');
    socket.on('boards', () => {
      loadBoards();
    });
    loadBoards();
  }, [dispatch, user]);

  return (
    <>
      {overlay && <Overlay />}
      <div className="board-list-container">
        {boards.map((board) => (
          <BoardItem board={board} key={board._id} />
        ))}
        <BoardItemAdd />
      </div>
    </>
  );
};

export default BoardList;
