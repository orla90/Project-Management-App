import React from 'react';
import { useForm } from 'react-hook-form';
import { createBoardFetch } from 'store/actions-creators/boards/boards-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import './newBoardModal.scss';
import { ROUTES } from 'constants/routes';

interface INewBoardModalProps {
  open: boolean;
  onClose: () => void;
}

type FormValues = {
  title: string;
  description: string;
};

function NewBoardModal(props: INewBoardModalProps) {
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
    try {
      await dispatch(createBoardFetch({ title: data.title, owner: user.id, users: [] })).unwrap();
      reset({ title: '', description: '' });
      props.onClose();
      navigate(ROUTES.BOARDS_LIST);
    } catch (error) {
      alert(error);
    }
  });

  return (
    <Modal open={props.open} title="Create board" onClose={props.onClose}>
      <div className="form-container">
        <form className="create-board__form" onSubmit={onSubmit}>
          <div className="input-body">
            <label className="create-board__label">Title</label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is a required field',
              })}
            ></input>
            <div className="form-error">
              {errors?.title && <p className="error_massage">{errors.title.message || 'Error!'}</p>}
            </div>
          </div>
          <div className="input-body">
            <label>Description</label>
            <textarea {...register('description')} rows={4}></textarea>
            <div className="form-error"></div>
          </div>
          <div className="create-board__btn-wrapper">
            <button type="submit" className="main-page-btn">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NewBoardModal;
