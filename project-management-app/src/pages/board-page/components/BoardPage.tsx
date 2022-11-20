import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Modal from 'components/UI/modal/Modal';
import { ROUTES } from 'constants/routes';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import i18Obj from 'texts/board/board-page';
import './board-page.scss';
import Column from './column/Column';
import BoardForm from './board-form/BoardForm';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { getBoardFetch, getBoardsFetch } from 'store/actions-creators/board/board-action';
import { BoardProps } from 'store/interfaces/board';
import { boardSlice } from 'store/slices/board-slice';
import { RootState } from 'store/types/types-redux';
import { useSelector } from 'react-redux';

const BoardPage = () => {
  const [addColumnModal, setAddColumnModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const { user } = useAppSelector((state) => state.signSlice);
  const [boards, setBoards] = useState([]);
  const board = useSelector((state: RootState) => state.boardSlice);
  const state = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { setBoard } = boardSlice.actions;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    getBoards();
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  useEffect(() => {
    if (boards.length !== 0) {
      getBoard((boards[0] as BoardProps)._id);
    }
  }, [boards]);

  useEffect(() => {
    if (board) {
      console.log(state);
      console.log(board);
    }
  }, [board]);

  const getBoards = async () => {
    await dispatch(getBoardsFetch({}))
      .unwrap()
      .then((data) => setBoards(data))
      .catch((e) => console.log(e));
  };

  const getBoard = async (_id: string) => {
    await dispatch(getBoardFetch({ _id }))
      .unwrap()
      .then((data) => dispatch(setBoard(data)))
      .then(() => console.log(board))
      .catch((e) => console.log(e));
  };

  return (
    <article className="board">
      <div className="board__container">
        <div className="board__panel">
          <CustomLink className="welcome-page__btn main-page-btn" to={`../${ROUTES.BOARDS_LIST}`}>
            {i18Obj[lang].back}
          </CustomLink>
          <CustomButton
            className="board__add-column-btn"
            onClick={() => {
              setAddColumnModal(true);
            }}
          >
            {i18Obj[lang].column}
          </CustomButton>
        </div>
        <div className="board-list__container">
          <div className="board__list">
            <Column />
          </div>
        </div>
      </div>
      <Modal
        open={addColumnModal}
        onClose={() => setAddColumnModal(false)}
        title={i18Obj[lang].addColumn}
      >
        {
          <BoardForm
            onClose={() => setAddColumnModal(false)}
            description={false}
            target={'addColumn'}
          />
        }
      </Modal>
    </article>
  );
};

export default BoardPage;
