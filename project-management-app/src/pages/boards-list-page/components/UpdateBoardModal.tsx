import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateBoardFetch } from 'store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import i18Obj from 'texts/board/board-page';
import { FormValues } from '../types/FormValues';
import { IBoard } from './interfaces/IBoard';

interface IUpdateBoardModalProps {
  board: IBoard;
  open: boolean;
  onClose: () => void;
}
function UpdateBoardModal(props: IUpdateBoardModalProps) {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  const dispatch = useAppDispatch();

  const [title, setTiyle] = useState(props.board.title);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (data: FormValues) => {
    dispatch(updateBoardFetch({ ...props.board, title: data.title }));
    setTiyle(data.title);
    reset({ title: '', description: '' });
    props.onClose();
  });

  return (
    <Modal open={props.open} title={i18Obj[lang].updateBoard} onClose={props.onClose}>
      <div className="form-container">
        <form className="create-board__form" onSubmit={onSubmit}>
          <div className="input-body">
            <label className="create-board__label">{i18Obj[lang].title}</label>
            <input
              type="text"
              defaultValue={title}
              {...register('title', {
                required: i18Obj[lang].errorModal,
              })}
            ></input>
            <div className="form-error">
              {errors?.title && <p className="error_massage">{errors.title.message || 'Error!'}</p>}
            </div>
          </div>
          <div className="input-body">
            <label>{i18Obj[lang].description}</label>
            <textarea {...register('description')} rows={4}></textarea>
            <div className="form-error"></div>
          </div>
          <div className="create-board__btn-wrapper">
            <button type="submit" className="main-page-btn">
              {i18Obj[lang].save}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateBoardModal;
