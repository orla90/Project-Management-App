import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import './board-custom-modal.scss';
import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import { CustomBoardModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { deleteColumnFetch, uppdateOrdersColumns } from 'store/actions-creators/board/board-action';
import { deleteTaskFetch } from 'store/actions-creators/board/task-actions';
import { ColumnProps } from 'store/interfaces/board';

const reorderColumns = (id: string, columns: Array<ColumnProps>): Array<ColumnProps> => {
  return columns
    .filter((a: ColumnProps) => {
      return a._id !== id;
    })
    .map((a: ColumnProps, i: number) => {
      return {
        _id: a._id,
        order: i,
      };
    });
};

const BoardCustomModal = (props: CustomBoardModalProps) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.languageSlice);
  const { columns } = useAppSelector((state) => state.boardSlice);
  const lang = language.toString() as Language;
  const handleOnClick = async () => {
    if (props.target === 'deleteColumn') {
      props.onClose();
      const reorderedCOlumns = reorderColumns(props.columnId, columns);
      if (reorderedCOlumns.length > 0) await dispatch(uppdateOrdersColumns(reorderedCOlumns));
      await dispatch(deleteColumnFetch({ columnId: props.columnId! }));
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
