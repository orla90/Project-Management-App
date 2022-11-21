import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useState } from 'react';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import './task.scss';

const Task = ({ title, description }: { title: string; description: string }) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  return (
    <div className="task">
      <div className="task__panel">
        <h3 className="task__title">{title}</h3>
        <div className="task__icons">
          <CustomButton
            className="task__icon task__icon_edit"
            onClick={() => {
              setEditTaskModal(true);
            }}
          />
          <CustomButton
            className="task__icon task__icon_bin"
            onClick={() => {
              setDeleteTaskModal(true);
            }}
          />
        </div>
      </div>
      <p className="task__description">{description}</p>
      <BoardCustomModal
        open={deleteTaskModal}
        onClose={() => setDeleteTaskModal(false)}
        title={i18Obj[lang].deleteTask}
        columnId={''}
      />
      <Modal
        open={editTaskModal}
        onClose={() => setEditTaskModal(false)}
        title={i18Obj[lang].editTask}
      >
        {
          <BoardForm
            onClose={() => setEditTaskModal(false)}
            description={true}
            target={'editTask'}
          />
        }
      </Modal>
    </div>
  );
};

export default Task;
