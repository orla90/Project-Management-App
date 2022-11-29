import { ColumnTitleEditProps } from 'pages/board-page/interfaces/column-interface';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { uppdateColumnTitleFetch } from 'store/actions-creators/board/board-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import './column-title-edit.scss';

const ColumnTitleEdit = (props: ColumnTitleEditProps) => {
  const [inputValue, setInputValue] = useState(props.title);
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

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
                lang: lang,
              })
            );
            props.setTitleEditMode(false);
          }}
        />
        <div className="column__icon_cross" onClick={() => props.setTitleEditMode(false)}>
          &times;
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ColumnTitleEdit;
