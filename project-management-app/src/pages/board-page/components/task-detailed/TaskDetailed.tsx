import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskWithProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { useState } from 'react';
import { deleteTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardForm from '../board-form/BoardForm';
import UsersList from '../task/users-list/UsersList';
import './task-detailed.scss';
import '../task/task.scss';
import { ToastContainer } from 'react-toastify';

const TaskDetailed = (props: TaskWithProps) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const { usersLogins } = useAppSelector((state) => state.boardSlice);
  const lang = language.toString() as Language;
  const [userList, setUserList] = useState(false);
  const [taskOwnerUser, setTaskOwnerUser] = useState<string>(
    props.findUserLogin!(props.task.userId, usersLogins)
  );
  const dispatch = useAppDispatch();

  const handleOnDeleteTaskClick = () => {
    dispatch(deleteTaskFetch({ columnId: props.task.columnId, taskId: props.task._id }));
  };

  return (
    <div className="task-detailed">
      <p className="task-detailed__description">{props.task.description}</p>
      <div className="task__panel">
        <div className="task__panel_user">
          <CustomButton
            className="task__icon task__icon_assign"
            onClick={() => setUserList(!userList)}
          />
          <span className="task__text_user">{taskOwnerUser}</span>
        </div>
        <div className="task__panel_task">
          <CustomButton
            className="task__icon task__icon_edit"
            onClick={() => {
              props.setTaskDetailedWindow!(false);
              props.setEditTaskModal!(true);
            }}
          />
          <CustomButton
            className="task__icon task__icon_bin"
            onClick={() => {
              props.setTaskDetailedWindow!(false);
              props.setDeleteTaskModal!(true);
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
        onClose={() => setDeleteTaskModal(false)}
        title={i18Obj[lang].deleteTask}
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
      <ToastContainer />
    </div>
  );
};

export default TaskDetailed;
