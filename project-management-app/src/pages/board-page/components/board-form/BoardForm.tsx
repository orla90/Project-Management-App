import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { useForm } from 'react-hook-form';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import './board-form.scss';
import { BoardFormModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { FormValues } from 'pages/board-page/types/modal-types';
import { createColumnFetch } from 'store/actions-creators/board/board-action';
import { createTasksColumnFetch, editTaskFetch } from 'store/actions-creators/board/task-actions';
import { dataTasks } from 'store/actions-creators/board/sort-data-all-tasks-fn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoardForm = (props: BoardFormModalProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const { columnOrder, tasks } = useAppSelector((state) => state.boardSlice);
  const lang = language.toString() as Language;
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onChange' });

  const [title, setTitle] = useState(props.task?.title || '');
  const [description, setDescription] = useState(props.task?.description.trim() || '');

  const handleOnSubmit = (data: FormValues) => {
    if (props.target === 'addColumn') {
      handleAddColumn(data);
    } else if (props.target === 'addTask') {
      handleAddTask(data);
    } else if (props.target === 'editTask') {
      handleEditTask(data);
    }
  };

  const handleAddColumn = async (data: FormValues) => {
    await dispatch(
      createColumnFetch({ title: data.title, order: columnOrder, lang: lang })
    ).unwrap();
    props.onClose();
  };

  const handleAddTask = async (data: FormValues) => {
    await dispatch(
      createTasksColumnFetch({
        title: data.title,
        columnId: props.columnId!,
        order: (tasks[props.columnId as keyof typeof tasks] as Array<dataTasks>)?.length || 0,
        description: data.description || ' ',
      })
    ).unwrap();
    props.onClose();
  };

  const handleEditTask = async (data: FormValues) => {
    await dispatch(
      editTaskFetch({
        title: data.title,
        columnId: props.task!.columnId!,
        taskId: props.task!._id!,
        description: data.description || '',
        order: props.task!.order,
        userId: props.task!.userId,
        users: props.task!.users,
      })
    ).unwrap();
    props.onClose();
  };

  return (
    <form className="board-form__body" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="board-form__wrapper">
        <label className="board-form__label">{i18Obj[lang].title}</label>
        <input
          type="text"
          {...register('title', {
            required: `${i18Obj[lang].required}`,
          })}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
        ></input>
        {errors.title?.type === 'required' && (
          <div className="board-form__error">{i18Obj[lang].required}</div>
        )}
      </div>
      {props.description && (
        <div className="board-form__wrapper">
          <label>{i18Obj[lang].description}</label>
          <textarea
            className="board-form__textarea"
            {...register('description')}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <div className="form-error"></div>
        </div>
      )}
      <div className="board-form__btn-container">
        <CustomButton className="main-page-btn board-form__btn" type="submit">
          {i18Obj[lang].confirm}
        </CustomButton>
      </div>
      <ToastContainer />
    </form>
  );
};

export default BoardForm;
