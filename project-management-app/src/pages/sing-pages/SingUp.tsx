import { CustomLink } from 'components/UI/custom-link/CustomLink';
import './styles/sign-pages.scss';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { setErrorNameOrLogin, setErrorPassword, showError } from './validation-functions';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { signUpFetch } from 'store/actions-creators/sing-in-sing-up/sign-up-action';
import { IsignProps } from 'store/interfaces/signUpProps';
import { signSlice } from 'store/slices/sign-slice';
import Overlay from 'components/UI/overlay/overlay';
import { Navigate } from 'react-router-dom';
import { key } from 'texts/header/header-text';
import { i18ObjSign } from 'texts/sign/sing-text';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const dispatch = useAppDispatch();
  const { overlay, user, errorRegistration, language } = useAppSelector((state) => state.signSlice);
  const { setSubmitErrorRegistration } = signSlice.actions;

  useEffect(() => {
    return () => {
      dispatch(setSubmitErrorRegistration(i18ObjSingFetchResponses.empty));
    };
  }, [dispatch, setSubmitErrorRegistration]);

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    dispatch(signUpFetch({ ...e, dispatch } as IsignProps));
  };
  return (
    <>
      {user && <Navigate to="/" />}
      {overlay && <Overlay />}
      <div className="sign-up">
        <div className="sign-up__container">
          <div className="sign-up__title">
            <h2>{i18ObjSign[language as key].singUp}</h2>
          </div>
          <div className="sign-up__body">
            <form className="sign-up__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="sign-up__input-body">
                <label htmlFor="login" className="sign-up__label">
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
                  className="sign-up__login"
                  name="login"
                  id="login"
                />

                <div className="sign-up__error">{showError(errors, 'login', language)}</div>
              </div>

              <div className="sign-up__input-body">
                <label htmlFor="name" className="sign-up__label">
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
                  className="sign-up__email"
                  name="name"
                  id="name"
                />
                <div className="sign-up__error">{showError(errors, 'name', language)}</div>
              </div>

              <div className="sign-up__input-body">
                <label htmlFor="login" className="sign-up__label">
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
                  className="sign-up__password"
                  name="password"
                  id="password"
                  autoComplete="on"
                />
                <div className="sign-up__error">{showError(errors, 'password', language)}</div>
              </div>

              <div className="sign-up__question">
                {i18ObjSign[language as key].questionUp}
                <CustomLink className="sign-up__link" to={'/sign-in'}>
                  {i18ObjSign[language as key].singIn}
                </CustomLink>
              </div>

              <div className="sign-up__error-submit">
                {errorRegistration[language as keyof typeof errorRegistration]}
              </div>

              <button type="submit" className="sign-up__button main-page-btn">
                {i18ObjSign[language as key].singUp}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
