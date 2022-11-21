import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { Itasks } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useEffect, useState } from 'react';
import { getTasksColumnFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { ColumnProps } from 'store/interfaces/board';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import Task from '../task/Task';
import ColumnTitleConfirmed from './column-title-confirmed/ColumnTitleConfirmed';
import ColumnTitleEdit from './column-title-edit/ColumnTitleEdit';
import './column.scss';

const Column = ({ props }: { props: ColumnProps }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState<Itasks[]>([]);

  useEffect(() => {
    getDataTaskas();
  }, [dispatch, getTasksColumnFetch]);

  const getDataTaskas = async () => {
    const data = await dispatch(getTasksColumnFetch({ columnId: props._id! }));
    setTasks(data.payload as Itasks[]);
  };

  return (
    <div className="column">
      <div className="column__info">
        {titleEditMode ? (
          <ColumnTitleEdit
            setTitleEditMode={setTitleEditMode}
            columnId={props._id!}
            order={props.order!}
          />
        ) : (
          <ColumnTitleConfirmed
            title={props.title!}
            setDeleteColumnModal={setDeleteColumnModal}
            setTitleEditMode={setTitleEditMode}
          />
        )}
      </div>
      <div className="column__content">
        {tasks.map((a: Itasks) => {
          return (
            <Task
              key={a._id}
              title={a.title}
              description={a.description}
              taskId={a._id}
              columnId={props._id!}
            />
          );
        })}
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
        columnId={props._id!}
        target={'deleteColumn'}
        setTasks={setTasks}
      />
      <Modal
        open={addTaskModal}
        onClose={() => setAddTaskModal(false)}
        title={i18Obj[lang].addTask}
      >
        {
          <BoardForm
            onClose={() => setAddTaskModal(false)}
            description={true}
            columbId={props._id}
            target={'addTask'}
            setTasks={setTasks}
          />
        }
      </Modal>
    </div>
  );
};

export default Column;
