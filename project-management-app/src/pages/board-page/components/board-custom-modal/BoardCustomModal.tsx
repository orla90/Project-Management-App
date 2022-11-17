import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import './board-custom-modal.scss';
import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomBoardModalProps } from 'pages/board-page/interfaces/modal-interfaces';

const DeleteModal = (props: CustomBoardModalProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <Modal open={props.open} title={props.title} onClose={props.onClose}>
      <div className="content-container">{props.children}</div>
      <div className="btn-container">
        <CustomButton className="main-page-btn" onClick={props.onClose}>
          {i18Obj[lang].no}
        </CustomButton>
        <CustomButton className="main-page-btn create-board-btn" type="submit">
          {i18Obj[lang].yes}
        </CustomButton>
      </div>
    </Modal>
  );
};

export default DeleteModal;
