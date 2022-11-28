import { TaskUsers } from 'pages/board-page/interfaces/task-interface';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { editTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import './user-list.scss';

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
          lang: lang,
        })
      ).unwrap();
      props.setUserList(false);
      props.setTaskOwnerUser(user);
    } catch (error) {
      alert('Что-то пошло не так, попробуй перезагрузить страницу');
    }
  };

  const userItem = props.users.map((user) => (
    <li className="task__users-item" key={user} onClick={() => handleOnClick(user)}>
      {user}
    </li>
  ));
  return <ul className="task__users-list">{userItem}</ul>;
};

export default UsersList;
