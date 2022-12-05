import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { Itasks } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { ColumnProps } from 'store/interfaces/board';
import i18Obj from 'texts/board/board-page';
import BoardForm from '../board-form/BoardForm';
import Task from '../task/Task';
import ColumnTitleConfirmed from './column-title-confirmed/ColumnTitleConfirmed';
import ColumnTitleEdit from './column-title-edit/ColumnTitleEdit';
import './column.scss';
import { Droppable } from 'react-beautiful-dnd';
import { ToastContainer } from 'react-toastify';
import { deleteColumn } from '../board-page-functions/fetch-functions';

const Column = ({ props }: { props: ColumnProps }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);

  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();

  const handleOnClick = useCallback(async () => {
    deleteColumn(lang, dispatch, props.columns!, props._id!);
  }, [lang, props.columns, dispatch, props._id]);

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
        <div className="tasks__scroll-container">
          <Droppable droppableId={props._id!} type={'Tasks'} direction={'vertical'}>
            {(provided) => (
              <div className="column__body" ref={provided.innerRef} {...provided.droppableProps}>
                {props.tasks!.map((task: Itasks) => {
                  return <Task key={task._id} columnId={props._id!} task={task} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="column__btn">
          <CustomButton className="main-page-btn" onClick={() => setAddTaskModal(true)}>
            {i18Obj[lang].task}
          </CustomButton>
        </div>
        <Modal
          open={deleteColumnModal}
          title={i18Obj[lang].deleteColumn}
          onClose={() => setDeleteColumnModal(false)}
        >
          <div className="column__btn-wrapper">
            <CustomButton
              onClick={() => handleOnClick()}
              className="main-page-btn-accent  column__btn_confirm"
            >
              {i18Obj[lang].confirm}
            </CustomButton>
          </div>
        </Modal>
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
      <ToastContainer />
    </div>
  );
};

export default Column;
