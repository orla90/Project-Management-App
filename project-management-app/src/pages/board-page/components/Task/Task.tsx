import React from 'react';
import './task.scss';

const Task = () => {
  return (
    <div className="task">
      <div className="task__panel">
        <h3 className="task__title">Title</h3>
        <div className="task__icon"></div>
      </div>
      <p className="task__description">description</p>
    </div>
  );
};

export default Task;
