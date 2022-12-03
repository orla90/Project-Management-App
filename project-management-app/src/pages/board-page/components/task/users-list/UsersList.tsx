import { TaskUsers } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { editTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/errors-and-warnings/translate';
import './user-list.scss';
import { v4 as uuidv4 } from 'uuid';

const UsersList = (props: TaskUsers) => {
  const { usersLogins } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const handleOnClick = async (user: string) => {
    try {
      await dispatch(
        editTaskFetch({
          title: props.task.title,
          columnId: props.task.columnId!,
          taskId: props.task._id!,
          description: props.task.description || '',
          order: props.task.order || 0,
          userId: usersLogins[user as keyof typeof usersLogins],
          users: [...props.users],
        })
      ).unwrap();
      props.setUserList(false);
      props.setTaskOwnerUser(user);
    } catch (error) {
      toast.error(`${i18Obj[lang].somethingWrong}`);
    }
  };

  const userItem = props.users.map((user) => (
    <>
      <li className="task__users-item" key={uuidv4()} onClick={() => handleOnClick(user)}>
        {user}
      </li>
      <ToastContainer />
    </>
  ));
  return <ul className="task__users-list">{userItem}</ul>;
};

export default UsersList;
