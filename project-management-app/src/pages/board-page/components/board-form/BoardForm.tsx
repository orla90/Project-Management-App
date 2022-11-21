import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { useForm } from 'react-hook-form';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import './board-form.scss';
import { BoardFormModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { FormValues } from 'pages/board-page/types/modal-types';
import { createColumnFetch } from 'store/actions-creators/board/board-action';
import {
  createTasksColumnFetch,
  getTasksColumnFetch,
} from 'store/actions-creators/board/task-actions';
import { Itasks } from 'pages/board-page/interfaces/task-interface';

const BoardForm = (props: BoardFormModalProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onChange' });

  const getDataTaskas = async () => {
    const data = await dispatch(getTasksColumnFetch({ columnId: props.columbId! }));
    if (props.setTasks) {
      props.setTasks(data.payload as Itasks[]);
    }
  };

  const onSubmitAddColumn = async (data: FormValues) => {
    console.log('ОТправка формы', props.target);

    if (props.target === 'addColumn') {
      try {
        await dispatch(createColumnFetch({ title: data.title, order: 0 })).unwrap();
        props.onClose();
      } catch (error) {
        alert(error);
      }
    }
    if (props.target === 'addTask') {
      try {
        console.log('++++');

        await dispatch(
          createTasksColumnFetch({
            title: data.title,
            columnId: props.columbId!,
            order: 1,
            description: data.description || '',
          })
        ).unwrap();
        props.onClose();
        getDataTaskas();
      } catch (error) {
        console.log('----');
        alert(error);
      }
    }
  };

  return (
    <form className="board-form__body" onSubmit={handleSubmit(onSubmitAddColumn)}>
      <div className="input-body">
        <label className="board-form__label">{i18Obj[lang].title}</label>
        <input
          type="text"
          {...register('title', {
            required: `${i18Obj[lang].required}`,
          })}
        ></input>
        {errors.title?.type === 'required' && (
          <div className="board-form__error">{i18Obj[lang].required}</div>
        )}
      </div>
      {props.description && (
        <div className="input-body">
          <label>{i18Obj[lang].description}</label>
          <textarea {...register('description')} rows={4}></textarea>
          <div className="form-error"></div>
        </div>
      )}
      <div className="btn-container">
        <CustomButton className="main-page-btn board-form__btn" onClick={props.onClose}>
          {i18Obj[lang].no}
        </CustomButton>
        <CustomButton className="main-page-btn board-form__btn board-form__btn_pink" type="submit">
          {i18Obj[lang].yes}
        </CustomButton>
      </div>
    </form>
  );
};

export default BoardForm;
