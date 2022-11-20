import React from 'react';
import { useAppSelector } from 'store/custom-hooks';
import { useForm } from 'react-hook-form';
import { Language } from 'pages/welcome-page/types/types';
import i18Obj from 'texts/board/board-page';
import { CustomButton } from 'components/UI/button/CustomButton';
import './board-form.scss';
import { BoardFormModalProps } from 'pages/board-page/interfaces/modal-interfaces';
import { FormValues } from 'pages/board-page/types/modal-types';
import { createColumnFetch } from 'store/actions-creators/board/board-action';

const BoardForm = (props: BoardFormModalProps) => {
  const { language } = useAppSelector((state) => state.languageSlice);
  const lang = language.toString() as Language;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: 'onChange' });

  // const onSubmit = handleSubmit(async (data: FormValues) => {
  //   if (props.target === 'addColumn') {
  //     try {
  //       await dispatch(createColumnFetch({ title: data.title, order: 0, boardId:  })).unwrap();
  //       reset({ title: '', description: '' });
  //       props.onClose();
  //       // navigate(ROUTES.BOARDS_LIST);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // });
  // target={'addColumn'}

  const onSubmit = handleSubmit(() => null);
  // const onSubmit = handleSubmit(async (data: FormValues) => {
  //   try {
  //     await dispatch(createBoardFetch({ title: data.title, owner: user!.id, users: [] })).unwrap();
  //     reset({ title: '', description: '' });
  //     props.onClose();
  //     navigate(ROUTES.BOARDS_LIST);
  //   } catch (error) {
  //     alert(error);
  //   }
  // });
  // target={'addColumn'}

  return (
    <form className="board-form__body" onSubmit={onSubmit}>
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
        <CustomButton className="main-page-btn create-board-btn board-form__btn" type="submit">
          {i18Obj[lang].yes}
        </CustomButton>
      </div>
    </form>
  );
};

export default BoardForm;
