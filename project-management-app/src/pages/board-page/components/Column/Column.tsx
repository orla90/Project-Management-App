import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import Task from '../task/Task';
import ColumnTitleConfirmed from './column-title-confirmed/ColumnTitleConfirmed';
import ColumnTitleEdit from './column-title-edit/ColumnTitleEdit';
import './column.scss';

const Column = () => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <div className="column">
      <div className="column__info">
        {titleEditMode ? (
          <ColumnTitleEdit setTitleEditMode={setTitleEditMode} />
        ) : (
          <ColumnTitleConfirmed
            setDeleteColumnModal={setDeleteColumnModal}
            setTitleEditMode={setTitleEditMode}
          />
        )}
      </div>
      <div className="column__content">
        <Task />
      </div>
      <div className="column__btn">
        <CustomButton className="main-page-btn" onClick={() => setAddTaskModal(true)}>
          {i18Obj[lang].task}
        </CustomButton>
      </div>
      <BoardCustomModal
        open={deleteColumnModal}
        onClose={() => setDeleteColumnModal(false)}
        title={i18Obj[lang].deleteColumn}
      />
      <Modal
        open={addTaskModal}
        onClose={() => setAddTaskModal(false)}
        title={i18Obj[lang].addTask}
      >
        {<BoardForm onClose={() => setAddTaskModal(false)} description={true} />}
      </Modal>
    </div>
  );
};

export default Column;
