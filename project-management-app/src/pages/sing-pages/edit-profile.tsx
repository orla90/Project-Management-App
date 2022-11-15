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
            <form className="edite-profile__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="edite-profile__input-body">
                <label htmlFor="login" className="edite-profile__label">
                  {i18ObjSign[language as key].login}
                </label>
                <input
                  {...register('login', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorNameOrLogin(value),
                    },
                  })}
                  type="text"
                  className="edite-profile__login"
                  name="login"
                  id="login"
                />

                <div className="edite-profile__error">{showError(errors, 'login', language)}</div>
              </div>

              <div className="edite-profile__input-body">
                <label htmlFor="name" className="edite-profile__label">
                  {i18ObjSign[language as key].name}
                </label>
                <input
                  {...register('name', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorNameOrLogin(value),
                    },
                  })}
                  type="text"
                  className="edite-profile__email"
                  name="name"
                  id="name"
                />
                <div className="edite-profile__error">{showError(errors, 'name', language)}</div>
              </div>

              <div className="edite-profile__input-body">
                <label htmlFor="login" className="edite-profile__label">
                  {i18ObjSign[language as key].password}
                </label>
                <input
                  {...register('password', {
                    required: true,
                    validate: {
                      customFn: (value) => setErrorPassword(value),
                    },
                  })}
                  type="password"
                  className="edite-profile__password"
                  name="password"
                  id="password"
                  autoComplete="on"
                />
                <div className="edite-profile__error">
                  {showError(errors, 'password', language)}
                </div>
              </div>

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
