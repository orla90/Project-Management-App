import Modal from 'components/UI/modal/Modal';
import { FormValues } from 'pages/board-page/types/modal-types';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { deleteBoardFetch } from 'store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import { IDeleteBoardModalProps } from './interfaces/IDeleteBoardModalProps';
import './delete-board-modal.scss';

function DeleteBoardModal(props: IDeleteBoardModalProps) {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    dispatch(deleteBoardFetch({ id: props.id }));
    props.onClose();
    console.log('доска удаляется');
  };

  return (
    <Modal open={props.open} title={i18Obj[lang].deleteBoard} onClose={props.onClose}>
      <div className="modal-container">
        <div className="delete-board__btn-wrapper">
          <button className="main-page-btn btn-yes" onClick={onConfirm}>
            {i18Obj[lang].yes}
          </button>
          <button className="main-page-btn btn-no" onClick={props.onClose}>
            {i18Obj[lang].no}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBoardModal;
