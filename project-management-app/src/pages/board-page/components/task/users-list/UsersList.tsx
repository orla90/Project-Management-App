import { TaskUsers, TaskUsersProps } from 'pages/board-page/interfaces/task-interface';
import React from 'react';
import { editTaskFetch } from 'store/actions-creators/board/task-actions';
import { useAppDispatch } from 'store/custom-hooks';
import './user-list.scss';

const UsersList = (props: TaskUsers) => {
  const dispatch = useAppDispatch();
  const handleOnClick = async (user: TaskUsersProps) => {
    try {
      await dispatch(
        editTaskFetch({
          title: props.task.title,
          columnId: props.task.columnId!,
          taskId: props.task.taskId!,
          description: props.task.description || '',
          order: props.task.order || 0,
          userId: user._id,
          users: [user._id],
        })
      ).unwrap();
      props.setUserList(false);
      props.setTaskOwnerUser(user);
    } catch (error) {
      alert(error);
    }
  };

  const userItem = props.users.map((user) => (
    <li className="task__users-item" key={user._id} onClick={() => handleOnClick(user)}>
      {user.login}
    </li>
  ));
  return <ul className="task__users-list">{userItem}</ul>;
};

export default UsersList;
