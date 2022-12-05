import React from 'react';
import { useForm } from 'react-hook-form';
import { createBoardFetch } from 'store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import './newBoardModal.scss';
import { ROUTES } from 'constants/routes';
import i18Obj from 'texts/board/board-page';
import { Language } from 'pages/welcome-page/types/types';
import { ToastContainer } from 'react-toastify';
import { FormValues } from 'pages/board-page/types/modal-types';
import { INewBoardModalProps } from './interfaces/INewBoardModalProps';

function NewBoardModal(props: INewBoardModalProps) {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: 'onChange' });

  const { user } = useAppSelector((state) => state.signSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    dispatch(
      createBoardFetch({
        title: { title: data.title, description: data.description ?? '' },
        owner: user!.id,
        users: [user!.id],
        lang: lang,
      })
    );
    reset({ title: '', description: '' });
    props.onClose();
    navigate(ROUTES.BOARDS_LIST);
  });

  return (
    <Modal open={props.open} title={i18Obj[lang].createBoard} onClose={props.onClose}>
      <div className="form-container">
        <form className="create-board__form" onSubmit={onSubmit}>
          <div className="input-body">
            <label className="create-board__label">{i18Obj[lang].title}</label>
            <input
              type="text"
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
              {i18Obj[lang].create}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Modal>
  );
}

export default NewBoardModal;
