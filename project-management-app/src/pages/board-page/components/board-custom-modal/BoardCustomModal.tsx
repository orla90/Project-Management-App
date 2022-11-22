import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import './board-custom-modal.scss';
import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomBoardModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { deleteColumnFetch } from 'store/actions-creators/board/board-action';
import { deleteTaskFetch } from 'store/actions-creators/board/task-actions';

const BoardCustomModal = (props: CustomBoardModalProps) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  const handleOnClick = () => {
    if (props.target === 'deleteColumn') {
      dispatch(deleteColumnFetch({ columnId: props.columnId! }));
    } else if (props.target === 'deleteTask') {
      dispatch(deleteTaskFetch({ columnId: props.columnId!, taskId: props.taskId! }));
      props.onClose();
    }
  };

  return (
    <Modal open={props.open} title={props.title} onClose={props.onClose}>
      <div className="content-container">{props.children}</div>
      <div className="btn-container">
        <CustomButton className="main-page-btn btn-container__btn" onClick={props.onClose}>
          {i18Obj[lang].no}
        </CustomButton>
        <CustomButton
          onClick={handleOnClick}
          className="main-page-btn-accent create-board-btn btn-container__btn"
        >
          {i18Obj[lang].yes}
        </CustomButton>
      </div>
    </Modal>
  );
};

export default BoardCustomModal;
