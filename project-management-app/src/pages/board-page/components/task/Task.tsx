import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskProps, TaskUsersProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getUserFetch, getUsersFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import './task.scss';
import UsersList from './users-list/UsersList';

const Task = (props: TaskProps) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const [users, setUsers] = useState<TaskUsersProps[]>([]);
  const [userList, setUserList] = useState(false);
  const dispatch = useAppDispatch();
  const [taskOwnerUser, setTaskOwnerUser] = useState<TaskUsersProps | null>(null);

  useEffect(() => {
    getAllUsers();
    getTaskOwnerUser();
  }, [dispatch]);

  const getAllUsers = async () => {
    await dispatch(getUsersFetch({}))
      .unwrap()
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  };

  const getTaskOwnerUser = async () => {
    await dispatch(getUserFetch({ _id: props.userId }))
      .unwrap()
      .then((data) => setTaskOwnerUser(data))
      .catch((e) => console.log(e));
  };

  const handleOnAssignBtnClick = () => {
    setUserList(!userList);
  };

  return (
    <div className="task">
      <h3 className="task__text_title">{props.title}</h3>
      <p className="task__text_description">{props.description}</p>
      <div className="task__panel">
        <div className="task__panel_user">
          <CustomButton
            className="task__icon task__icon_assign"
            onClick={() => handleOnAssignBtnClick()}
          />
          <span className="task__text_user">{taskOwnerUser?.login}</span>
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
            users={users}
            setTaskOwnerUser={setTaskOwnerUser}
            setUserList={setUserList}
            task={props}
          />
        )}
      </div>
      <BoardCustomModal
        open={deleteTaskModal}
        onClose={() => setDeleteTaskModal(false)}
        title={i18Obj[lang].deleteTask}
        columnId={props.columnId}
        taskId={props.taskId}
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
            columnId={props.columnId}
            taskId={props.taskId}
            target={'editTask'}
            order={props.order}
          />
        }
      </Modal>
    </div>
  );
};

export default Task;
