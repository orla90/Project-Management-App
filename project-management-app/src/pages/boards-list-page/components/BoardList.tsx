import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import './board-list.scss';
import BoardItemAdd from './BoardItemAdd';
import { getBoardsByUserIdFetch } from '../../../store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IBoard } from './interfaces/IBoard';
import { io } from 'socket.io-client';
import Overlay from 'components/UI/overlay/Overlay';
import { Language } from 'pages/welcome-page/types/types';
import { ToastContainer } from 'react-toastify';

const BoardList = () => {
  const [, setBoards] = useState<IBoard[]>([]);
  const [overlay, setOverlay] = useState(false);
  const { user } = useAppSelector((state) => state.signSlice);
  const { boards } = useAppSelector((state) => state.boardListSlice);
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  useEffect(() => {
    const loadBoards = async () => {
      setOverlay(true);
      try {
        const userBoards = await dispatch(
          getBoardsByUserIdFetch({ userId: user!.id, lang: lang })
        ).unwrap();
        setBoards(userBoards);
      } catch (error) {
        alert(error);
      } finally {
        setOverlay(false);
      }
    };
    const socket = io('wss://react-final-project-production.up.railway.app/');
    socket.on('boards', (message) => {
      loadBoards();
    });
    loadBoards();
    return () => {
      socket.close();
    };
  }, [dispatch, user]);

  return (
    <>
      {overlay && <Overlay />}
      <div className="board-list-container">
        {boards.map((board) => (
          <BoardItem board={board} key={board._id} />
        ))}
        <BoardItemAdd />
        <ToastContainer />
      </div>
    </>
  );
};

export default BoardList;
