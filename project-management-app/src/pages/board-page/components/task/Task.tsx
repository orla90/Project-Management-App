import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskWithProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useState } from 'react';
import {} from 'store/actions-creators/board/task-actions';
import { useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
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
  const [taskDetailedWindow, serTaskDetailedWindow] = useState(false);

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
    console.log('task');
  };

  return (
    <div className="task" onClick={() => handleTaskOnClick()}>
      <h3 className="task__text_title">{props.task.title}</h3>
      <p className="task__text_description">{props.task.description}</p>
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
      <BoardCustomModal
        open={deleteTaskModal}
        onClose={() => setDeleteTaskModal(false)}
        title={i18Obj[lang].deleteTask}
        columnId={props.task.columnId}
        taskId={props.task._id}
        target={'deleteTask'}
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
            task={props.task}
          />
        }
      </Modal>
    </div>
  );
};

export default Task;
