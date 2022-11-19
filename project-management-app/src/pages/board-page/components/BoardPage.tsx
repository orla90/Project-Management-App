import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Modal from 'components/UI/modal/Modal';
import { ROUTES } from 'constants/routes';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import './board-page.scss';
import Column from './Column/Column';
import BoardForm from './board-form/BoardForm';

const BoardPage = () => {
  const [addColumnModal, setAddColumnModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

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
        {<BoardForm onClose={() => setAddColumnModal(false)} description={false} />}
      </Modal>
    </article>
  );
};

export default BoardPage;
