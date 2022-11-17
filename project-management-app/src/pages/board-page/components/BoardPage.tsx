import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomLink } from 'components/UI/custom-link/CustomLink';
import { ROUTES } from 'constants/routes';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import './board-page.scss';
import Column from './Column/Column';

const BoardPage = () => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <article className="board">
      <div className="board__container">
        <div className="board__panel">
          <CustomLink className="welcom-page__btn main-page-btn" to={`../${ROUTES.BOARDS_LIST}`}>
            {i18Obj[lang].back}
          </CustomLink>
          <CustomButton className="board__add-column-btn">{i18Obj[lang].column}</CustomButton>
        </div>
        <div className="board__list">
          <Column />
        </div>
      </div>
    </article>
  );
};

export default BoardPage;
