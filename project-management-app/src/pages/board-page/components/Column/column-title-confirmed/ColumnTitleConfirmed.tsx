import { ColumnTitleConfirmedProps } from 'pages/board-page/interfaces/column-interface';
import React from 'react';
import './column-title-confirmed.scss';

const ColumnTitleConfirmed = (props: ColumnTitleConfirmedProps) => {
  return (
    <>
      <div className="column__icon column__icon_pen" onClick={() => props.setTitleEditMode(true)} />
      <h3 className="column__title">{props.title}</h3>
      <div
        className="column__icon column__icon_bin"
        onClick={() => props.setDeleteColumnModal(true)}
      />
    </>
  );
};

export default ColumnTitleConfirmed;
