import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import './edit-task-form.scss';
import { TaskEditModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { FormValues } from 'pages/board-page/types/modal-types';

const EditTaskForm = (props: TaskEditModalProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = handleSubmit(() => null);

  return (
    <form className="task-edit__form" onSubmit={onSubmit}>
      <div className="input-body">
        <label className="task-edit__label">{i18Obj[lang].title}</label>
        <input
          type="text"
          {...register('title', {
            required: `${i18Obj[lang].required}`,
          })}
        ></input>
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => <p className="task-edit__error">{message}</p>}
        />
      </div>
      <div className="input-body">
        <label>{i18Obj[lang].description}</label>
        <textarea {...register('description')} rows={4}></textarea>
        <div className="form-error"></div>
      </div>
      <div className="btn-container">
        <CustomButton className="main-page-btn" onClick={props.onClose}>
          {i18Obj[lang].no}
        </CustomButton>
        <CustomButton className="main-page-btn create-board-btn" type="submit">
          {i18Obj[lang].yes}
        </CustomButton>
      </div>
    </form>
  );
};

export default EditTaskForm;
