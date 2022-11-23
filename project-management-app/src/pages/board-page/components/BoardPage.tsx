import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Modal from 'components/UI/modal/Modal';
import { ROUTES } from 'constants/routes';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import i18Obj from 'texts/board/board-page';
import './board-page.scss';
import BoardForm from './board-form/BoardForm';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { getColumnsFetch } from 'store/actions-creators/board/board-action';
import { io } from 'socket.io-client';
import Overlay from 'components/UI/overlay/Overlay';
import { Navigate } from 'react-router-dom';
import { ColumnProps } from 'store/interfaces/board';
import { boardSlice } from 'store/slices/board-slice';
import Column from './column/Column';
import InviteUser from './invite-user/InviteUser';
import { i18ObjInviteUSer } from 'texts/board/invite-user';
import { key } from 'texts/footer/footer-text';

const BoardPage = () => {
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [inviteUser, setInviteUser] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const dispatch = useAppDispatch();
  const { resetBordAndColumns } = boardSlice.actions;
  const { columns, overlay, board } = useAppSelector((state) => state.boardSlice);
  const lang = language.toString() as Language;

  useEffect(() => {
    const socket = io('https://react-final-project-production.up.railway.app/');
    socket.on('columns', () => {
      dispatch(getColumnsFetch({}));
    });
    dispatch(getColumnsFetch({}));
    return () => {
      socket.close();
      dispatch(resetBordAndColumns());
    };
  }, [dispatch, board, resetBordAndColumns]);
  return (
    <>
      {board === null && <Navigate to={`../${ROUTES.BOARDS_LIST}`} />}
      {overlay && <Overlay />}
      <article className="board">
        <div className="board__container">
          <div className="board__panel">
            <CustomLink className="welcome-page__btn main-page-btn" to={`../${ROUTES.BOARDS_LIST}`}>
              {i18Obj[lang].back}
            </CustomLink>
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
            <CustomButton
              className="board__add-column-btn"
              onClick={() => {
                setAddColumnModal(true);
              }}
            >
              {i18Obj[lang].column}
            </CustomButton>

            <Modal
              open={inviteUser}
              onClose={() => setInviteUser(false)}
              title={i18ObjInviteUSer[language as key].title}
            >
              {<InviteUser />}
            </Modal>
            <CustomButton
              className="board__add-column-btn"
              onClick={() => {
                setInviteUser(true);
              }}
            >
              {i18ObjInviteUSer[language as key].generalButton}
            </CustomButton>
          </div>
          <div className="board-list__body">
            <div className="board__list">
              {columns.map((a: ColumnProps) => {
                return <Column key={a.title} props={a} />;
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BoardPage;
