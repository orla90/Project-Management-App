import { ColumnTitleEditProps } from 'pages/board-page/interfaces/column-interface';
import React, { useState } from 'react';
import { uppdateColumnTitleFetch } from 'store/actions-creators/board/board-action';
import { useAppDispatch } from 'store/custom-hooks';
import './column-title-edit.scss';

const ColumnTitleEdit = (props: ColumnTitleEditProps) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <>
      <input
        type="text"
        className="column__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="column__icons">
        <div
          className="column__icon column__icon_done"
          onClick={() => {
            dispatch(
              uppdateColumnTitleFetch({
                title: inputValue,
                columnId: props.columnId,
                order: props.order,
              })
            );
            props.setTitleEditMode(false);
          }}
        />
        <div className="column__icon_cross" onClick={() => props.setTitleEditMode(false)}>
          &times;
        </div>
      </div>
    </>
  );
};

export default ColumnTitleEdit;
