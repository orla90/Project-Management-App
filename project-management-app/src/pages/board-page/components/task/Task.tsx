import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskWithProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ToastContainer } from 'react-toastify';
import { deleteTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardForm from '../board-form/BoardForm';
import TaskDetailed from '../task-detailed/TaskDetailed';
import './task.scss';
import UsersList from './users-list/UsersList';

const Task = (props: TaskWithProps) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const { usersLogins } = useAppSelector((state) => state.boardSlice);
  const lang = language.toString() as Language;
  const [userList, setUserList] = useState(false);
  const [taskOwnerUser, setTaskOwnerUser] = useState<string>(
    findUserLogin(props.task.userId, usersLogins)
  );
  const [taskDetailedWindow, setTaskDetailedWindow] = useState(false);
  const dispatch = useAppDispatch();

  function findUserLogin(userID: string, obj: { [x: string]: string }): string {
    const newArr = Object.entries(obj);
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][1] === userID) return newArr[i][0];
    }
    return '';
  }

  const handleOnAssignBtnClick = () => {
    setUserList(!userList);
  };

  const handleTaskOnClick = () => {
    if (!taskDetailedWindow) {
      setTaskDetailedWindow(true);
    } else {
      setTaskDetailedWindow(false);
    }
  };

  const handleOnDeleteTaskClick = () => {
    dispatch(
      deleteTaskFetch({ columnId: props.task.columnId, taskId: props.task._id, lang: lang })
    );
  };

  return (
    <Draggable draggableId={props.task._id} index={props.task.order}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <h3 className="task__text_title" onClick={() => handleTaskOnClick()}>
            {props.task.title}
          </h3>
          <p className="task__text_description" onClick={() => handleTaskOnClick()}>
            {props.task.description}
          </p>
          <div className="task__panel">
            <div className="task__panel_user">
              <CustomButton
                className="task__icon task__icon_assign"
                onClick={() => handleOnAssignBtnClick()}
              />
              <span className="task__text_user">{taskOwnerUser}</span>
            </div>
            <div className="task__panel_task">
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
            {userList && (
              <UsersList
                users={Object.keys(usersLogins)}
                setTaskOwnerUser={setTaskOwnerUser}
                setUserList={setUserList}
                task={props.task}
              />
            )}
          </div>
          <Modal
            open={deleteTaskModal}
            title={i18Obj[lang].deleteTask}
            onClose={() => setDeleteTaskModal(false)}
          >
            <div className="task__btn-wrapper">
              <CustomButton
                onClick={() => handleOnDeleteTaskClick()}
                className="main-page-btn task__btn_confirm"
              >
                {i18Obj[lang].confirm}
              </CustomButton>
            </div>
          </Modal>
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
                task={props.task}
              />
            }
          </Modal>
          <Modal
            open={taskDetailedWindow}
            onClose={() => setTaskDetailedWindow(false)}
            title={props.task.title}
          >
            <TaskDetailed
              task={props.task}
              setTaskDetailedWindow={setTaskDetailedWindow}
              setEditTaskModal={setEditTaskModal}
              setDeleteTaskModal={setDeleteTaskModal}
              findUserLogin={findUserLogin}
            />
          </Modal>
          <ToastContainer />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
