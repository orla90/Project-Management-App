import { CustomLink } from 'components/UI/custom-link/CustomLink';
import Overlay from 'components/UI/overlay/overlay';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { signInFetch } from 'store/actions-creators/sing-in-sing-up/sign-in-action';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { IsignProps } from 'store/interfaces/signUpProps';
import { signSlice } from 'store/slices/sign-slice';
import { showError } from './validation-functions';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const dispatch = useAppDispatch();
  const { setSubmitErrorLogin } = signSlice.actions;
  const { overlay, user } = useAppSelector((state) => state.signSlice);
  const { errorLogin } = useAppSelector((state) => state.signSlice);

  useEffect(() => {
    return () => {
      dispatch(setSubmitErrorLogin(''));
    };
  }, [dispatch, setSubmitErrorLogin]);

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    dispatch(signInFetch(e as IsignProps));
  };
  return (
    <>
      {user && <Navigate to="/" />}
      {overlay && <Overlay />}
      <div className="sign-in">
        <div className="sign-in__container">
          <div className="sign-in__title">
            <h2>sign In</h2>
          </div>
          <div className="sign-in__body">
            <form className="sign-in__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="sign-in__input-body">
                <label htmlFor="login" className="sign-in__label">
                  Login
                </label>
                <input
                  {...register('login', {
                    required: true,
                  })}
                  type="text"
                  className="sign-in__login"
                  name="login"
                  id="login"
                />

                <div className="sign-in__error">{showError(errors, 'login')}</div>
              </div>

              <div className="sign-in__input-body">
                <label htmlFor="login" className="sign-in__label">
                  Password
                </label>
                <input
                  {...register('password', {
                    required: true,
                  })}
                  type="password"
                  className="sign-in__password"
                  name="password"
                  id="password"
                  autoComplete="on"
                />

                <div className="sign-in__error">{showError(errors, 'password')}</div>
              </div>

              <div className="sign-in__question">
                {`Have an account?`}
                <CustomLink className="sign-in__link" to={'/sign-up'}>
                  sign up
                </CustomLink>
              </div>

              <div className="sign-in__error-submit">{errorLogin}</div>

              <button type="submit" className="sign-in__button main-page-btn">
                sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
