import { CustomButton } from 'components/UI/button/CustomButton';
import Modal from 'components/UI/modal/Modal';
import { TaskProps } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getUsersFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { GetAllUsersProps } from 'store/interfaces/board';
import i18Obj from 'texts/board/board-page';
import BoardCustomModal from '../board-custom-modal/BoardCustomModal';
import BoardForm from '../board-form/BoardForm';
import './task.scss';
import UsersList from './usersList/UsersList';

const Task = ({ title, description, taskId, columnId, order }: TaskProps) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const currentUser = useAppSelector((state) => state.signSlice.user);
  const [user, setUser] = useState(currentUser);
  const [users, setUsers] = useState<GetAllUsersProps[]>([]);
  const [userList, setUserList] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllUsers();
  }, [dispatch]);

  const getAllUsers = async () => {
    await dispatch(getUsersFetch({}))
      .unwrap()
      .then((data) => setUsers(data))
      .then(() => console.log(users))
      .catch((e) => console.log(e));
  };

  const handleOnAssignBtnClick = () => {
    setUserList(!userList);
  };

  return (
    <div className="task">
      <h3 className="task__text_title">{title}</h3>
      <p className="task__text_description">{description}</p>
      <div className="task__panel">
        <div className="task__panel_user">
          <CustomButton
            className="task__icon task__icon_assign"
            onClick={() => handleOnAssignBtnClick()}
          />
          <span className="task__text_user">{user?.login}</span>
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
        {userList && <UsersList users={users} />}
      </div>
      <BoardCustomModal
        open={deleteTaskModal}
        onClose={() => setDeleteTaskModal(false)}
        title={i18Obj[lang].deleteTask}
        columnId={columnId}
        taskId={taskId}
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
            columnId={columnId}
            taskId={taskId}
            target={'editTask'}
            order={order}
          />
        }
      </Modal>
    </div>
  );
};

export default Task;
