import { TaskUsers } from 'pages/board-page/interfaces/task-interface';
import React from 'react';
import { GetAllUsersProps } from 'store/interfaces/board';
import './user-list.scss';

const UsersList = (props: TaskUsers) => {
  const handleOnClick = (user: GetAllUsersProps) => {
    console.log(user);
  };

  const userItem = props.users.map((user) => (
    <li className="task__users-item" key={user._id} onClick={() => handleOnClick(user)}>
      {user.login}
    </li>
  ));
  return <ul className="task__users-list">{userItem}</ul>;
};

export default UsersList;
