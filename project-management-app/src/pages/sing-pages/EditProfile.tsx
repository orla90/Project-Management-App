import CustomInput from 'components/UI/input/CustomInput';
import Overlay from 'components/UI/overlay/overlay';
import { ROUTES } from 'constants/routes';
import {
  setErrorNameOrLogin,
  showError,
  setErrorPassword,
} from 'pages/sing-pages/validation-functions';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { editProfileFetch } from 'store/actions-creators/edit-profile/edit-profile';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IeditProfileProps } from 'store/interfaces/edit-profile';
import { signSlice } from 'store/slices/sign-slice';
import { key } from 'texts/header/header-text';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';
import { i18ObjSign } from 'texts/sign/sing-text';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { user, editMessage, overlay, language, trueOrfalseEdit } = useAppSelector(
    (state) => state.signSlice
  );
  const { setEditMessage } = signSlice.actions;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    if (user)
      dispatch(
        editProfileFetch({
          ...e,
          dispatch,
          id: user.id,
          token: user.token,
        } as IeditProfileProps)
      );
  };

  useEffect(() => {
    return () => {
      dispatch(setEditMessage(i18ObjSingFetchResponses.empty));
    };
  }, [dispatch, setEditMessage]);

  return (
    <>
      {!user && <Navigate to={ROUTES.HOME} />}
      {overlay && <Overlay />}
      <div className="edite-profile">
        <div className="edite-profile__container">
          <div className="edite-profile__title">
            <h2> {i18ObjSign[language as key].singEdit}</h2>
          </div>
          <div className="edite-profile__body">
            <form className="edite-profile__form custom-form" onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                label={i18ObjSign[language as key].login}
                type={'text'}
                name={'login'}
                id={'login'}
                propsForm={{
                  ...register('login', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorNameOrLogin(value),
                    },
                  }),
                }}
                showErrorFn={showError}
                errors={errors}
                language={language}
              />

              <CustomInput
                label={i18ObjSign[language as key].name}
                type={'text'}
                name={'name'}
                id={'name'}
                propsForm={{
                  ...register('name', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorNameOrLogin(value),
                    },
                  }),
                }}
                showErrorFn={showError}
                errors={errors}
                language={language}
              />

              <CustomInput
                label={i18ObjSign[language as key].password}
                type={'password'}
                name={'password'}
                id={'password'}
                propsForm={{
                  ...register('password', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorPassword(value),
                    },
                  }),
                }}
                showErrorFn={showError}
                errors={errors}
                language={language}
              />

              <div
                className={`edite-profile__error-submit ${
                  trueOrfalseEdit ? 'fulfielled' : 'rejected'
                }`}
              >
                {editMessage[language as keyof typeof editMessage]}
              </div>
              <button type="submit" className="edite-profile__button main-page-btn">
                {i18ObjSign[language as key].change}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
