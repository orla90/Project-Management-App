import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { Itasks } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/custom-hooks';
import { ColumnProps } from 'store/interfaces/board';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import Task from '../task/Task';
import ColumnTitleConfirmed from './column-title-confirmed/ColumnTitleConfirmed';
import ColumnTitleEdit from './column-title-edit/ColumnTitleEdit';
import './column.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Column = ({ props }: { props: ColumnProps }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const { tasks } = useAppSelector((state) => state.boardSlice);
  const [taskColumn, setTaskColumn] = useState(
    tasks[props._id! as keyof typeof tasks] ? tasks[props._id! as keyof typeof tasks] : []
  );
  const lang = language.toString() as Language;
  useEffect(() => {
    setTaskColumn(tasks[props._id! as keyof typeof tasks] || []);
    console.log('USEEFFECT COLUMN-PAGE', taskColumn);
  }, [tasks]);
  return (
    <div
      className="column"
      ref={props.provided!.innerRef}
      {...props.provided!.draggableProps}
      {...props.provided!.dragHandleProps}
    >
      <div className="column__inner">
        <div className="column__info">
          {titleEditMode ? (
            <ColumnTitleEdit
              setTitleEditMode={setTitleEditMode}
              columnId={props._id!}
              order={props.order!}
              title={props.title!}
            />
          ) : (
            <ColumnTitleConfirmed
              title={props.title!}
              setDeleteColumnModal={setDeleteColumnModal}
              setTitleEditMode={setTitleEditMode}
            />
          )}
        </div>

        <Droppable droppableId={props._id!} type={'Tasks'} direction={'vertical'}>
          {(provided) => (
            <div className="column__body" ref={provided.innerRef} {...provided.droppableProps}>
              {(taskColumn as Array<Itasks>).map((task: Itasks) => {
                return <Task key={task._id} columnId={props._id!} task={task} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

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
              columnId={props._id}
              target={'addTask'}
            />
          }
        </Modal>
      </div>
    </div>
  );
};

export default Column;
