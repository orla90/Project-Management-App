import { ColumnTitleEditProps } from 'pages/board-page/interfaces/column-interface';
import React from 'react';
import './column-title-edit.scss';

const ColumnTitleEdit = (props: ColumnTitleEditProps) => {
  return (
    <>
      <input type="text" className="column__input" />
      <div className="column__icons">
        <div
          className="column__icon column__icon_done"
          onClick={() => props.setTitleEditMode(false)}
        />
        <div className="column__icon_cross" onClick={() => props.setTitleEditMode(false)}>
          &times;
        </div>
      </div>
    </>
  );
};

export default ColumnTitleEdit;
