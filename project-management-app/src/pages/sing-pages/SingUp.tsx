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
import CustomInput from 'components/UI/input/CustomInput';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

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
            <form className="sign-up__form custom-form" onSubmit={handleSubmit(onSubmit)}>
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

              <div className="sign-up__question">
                {i18ObjSign[language as key].questionUp}
                <CustomLink className="sign-up__link" to={'/sign-in'}>
                  {i18ObjSign[language as key].singIn}
                </CustomLink>
              </div>

              <div className="custom-form__error-submit">
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
