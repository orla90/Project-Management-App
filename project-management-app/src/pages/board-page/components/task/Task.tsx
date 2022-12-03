import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskWithProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ToastContainer } from 'react-toastify';
import { deleteTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardForm from '../board-form/BoardForm';
import { findUserLogin } from '../board-page-functions/find-owner-login';
import TaskDetailed from '../task-detailed/TaskDetailed';
import './task.scss';
import UsersList from './users-list/UsersList';

const Task = (props: TaskWithProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const { usersLogins } = useAppSelector((state) => state.boardSlice);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [userList, setUserList] = useState(false);
  const [taskOwnerUser, setTaskOwnerUser] = useState<string>(
    findUserLogin(props.task.userId, usersLogins)
  );
  const [taskDetailedWindow, setTaskDetailedWindow] = useState(false);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTaskOwnerUser(findUserLogin(props.task.userId, usersLogins));
  }, [props.task.userId, usersLogins]);

  const handleOnAssignBtnClick = useCallback((userList: boolean) => {
    setUserList(!userList);
  }, []);

  const handleTaskOnClick = useCallback((details: boolean) => {
    if (!details) {
      setTaskDetailedWindow(true);
    } else {
      setTaskDetailedWindow(false);
    }
  }, []);

  const handleOnDeleteTaskClick = useCallback(() => {
    dispatch(
      deleteTaskFetch({ columnId: props.task.columnId, taskId: props.task._id, lang: lang })
    );
  }, [dispatch, props.task.columnId, props.task._id, lang]);

  return (
    <Draggable draggableId={props.task._id} index={props.task.order}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <h3 className="task__text_title" onClick={() => handleTaskOnClick(taskDetailedWindow)}>
            {props.task.title}
          </h3>
          <p
            className="task__text_description"
            onClick={() => handleTaskOnClick(taskDetailedWindow)}
          >
            {props.task.description}
          </p>
          <div className="task__panel">
            <div className="task__panel_user">
              <CustomButton
                className="task__icon task__icon_assign"
                onClick={() => handleOnAssignBtnClick(userList)}
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
