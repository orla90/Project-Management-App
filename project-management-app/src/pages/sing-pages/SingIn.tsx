import { CustomLink } from 'components/UI/custom-link/CustomLink';
import CustomInput from 'components/UI/input/CustomInput';
import Overlay from 'components/UI/overlay/Overlay';
import { Language } from 'pages/welcome-page/types/types';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { signInFetch } from 'store/actions-creators/sing-in-sing-up/sign-in-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IsignProps } from 'store/interfaces/sign-up-props';
import { signSlice } from 'store/slices/sign-slice';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';
import { i18ObjSign, key } from 'texts/sign/sing-text';
import { showError } from './validation-functions';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const dispatch = useAppDispatch();
  const { setSubmitErrorLogin } = signSlice.actions;
  const { overlay, user } = useAppSelector((state) => state.signSlice);
  const { errorLogin, language } = useAppSelector((state) => state.signSlice);
  const lang = language.toString() as Language;

  useEffect(() => {
    return () => {
      dispatch(setSubmitErrorLogin(i18ObjSingFetchResponses.empty));
    };
  }, [dispatch, setSubmitErrorLogin]);

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    dispatch(signInFetch({ ...e, lang: lang } as IsignProps));
  };
  return (
    <>
      {user && <Navigate to="/" />}
      {overlay && <Overlay />}
      <div className="sign-in">
        <div className="sign-in__container">
          <div className="sign-in__title">
            <h2>{i18ObjSign[language as key].singIn}</h2>
          </div>
          <div className="sign-in__body">
            <form className="sign-in__form custom-form" onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                label={i18ObjSign[language as key].login}
                type={'text'}
                name={'login'}
                id={'login'}
                propsForm={{
                  ...register('login', {
                    required: true,
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
                  }),
                }}
                showErrorFn={showError}
                errors={errors}
                language={language}
              />

              <div className="sign-in__question">
                {i18ObjSign[language as key].questionIn}
                <CustomLink className="sign-in__link" to={'/sign-up'}>
                  {i18ObjSign[language as key].singUp}
                </CustomLink>
              </div>

              <div className="sign-in__error-submit">
                {errorLogin[language as keyof typeof errorLogin]}
              </div>

              <button type="submit" className="sign-in__button main-page-btn">
                {i18ObjSign[language as key].singIn}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;
