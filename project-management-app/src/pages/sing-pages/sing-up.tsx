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

const SignUp = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const dispatch = useAppDispatch();
  const { overlay, user } = useAppSelector((state) => state.signSlice);
  const { setSubmitErrorRegistration } = signSlice.actions;
  const { errorRegistration } = useAppSelector((state) => state.signSlice);

  useEffect(() => {
    return () => {
      dispatch(setSubmitErrorRegistration(''));
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
            <h2>sign up</h2>
          </div>
          <div className="sign-up__body">
            <form className="sign-up__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="sign-up__input-body">
                <label htmlFor="login" className="sign-up__label">
                  Login
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

                <div className="sign-up__error">{showError(errors, 'login')}</div>
              </div>

              <div className="sign-up__input-body">
                <label htmlFor="name" className="sign-up__label">
                  Name
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
                <div className="sign-up__error">{showError(errors, 'name')}</div>
              </div>

              <div className="sign-up__input-body">
                <label htmlFor="login" className="sign-up__label">
                  Password
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

                <div className="sign-up__error">{showError(errors, 'password')}</div>
              </div>
              <div className="sign-up__error-submit">{errorRegistration}</div>
              <div className="sign-up__question">
                {`Have an account?`}
                <CustomLink className="sign-up__link" to={'/sign-in'}>
                  sign in
                </CustomLink>
              </div>
              <button type="submit" className="sign-up__button main-page-btn">
                sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
