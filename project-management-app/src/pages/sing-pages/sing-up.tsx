import { CustomLink } from 'components/UI/custom-link/CustomLink';
import './styles/sing-pages.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { setErrorLogin, setErrorEmail, setErrorPassword, showError } from './validation-functions';
const SingUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = () => {
    reset();
  };
  return (
    <div className="sing-up">
      <div className="sing-up__container">
        <div className="sing-up__title">
          <h2>Sing up</h2>
        </div>
        <div className="sing-up__body">
          <form className="sing-up__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="sing-up__input-body">
              <label htmlFor="login" className="sing-up__label">
                Login
              </label>
              <input
                {...register('login', {
                  required: true,
                  validate: {
                    customFn: (value) => setErrorLogin(value),
                  },
                })}
                type="text"
                className="sing-up__login"
                name="login"
                id="login"
              />

              <div className="sing-up__error">{showError(errors, 'login')}</div>
            </div>

            <div className="sing-up__input-body">
              <label htmlFor="email" className="sing-up__label">
                Email
              </label>
              <input
                {...register('email', {
                  required: true,
                  validate: {
                    customFn: (value) => setErrorEmail(value),
                  },
                })}
                type="email"
                className="sing-up__email"
                name="email"
                id="email"
              />

              <div className="sing-up__error">{showError(errors, 'email')}</div>
            </div>

            <div className="sing-up__input-body">
              <label htmlFor="login" className="sing-up__label">
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
                className="sing-up__password"
                name="password"
                id="password"
              />

              <div className="sing-up__error">{showError(errors, 'password')}</div>
            </div>

            <div className="sing-up__question">
              {`Have an account?`}
              <CustomLink className="sing-up__link" to={'/sing-in'}>
                Sing in
              </CustomLink>
            </div>
            <button type="submit" className="sing-up__button main-page-btn">
              Sing up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SingUp;
