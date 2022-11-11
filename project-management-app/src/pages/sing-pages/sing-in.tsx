import { CustomLink } from 'components/UI/custom-link/CustomLink';
import React from 'react';
import { useForm } from 'react-hook-form';
import { setErrorLogin, showError, setErrorPassword } from './validation-functions';
const SingIn = () => {
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
    <div className="sing-in" style={{ paddingTop: '40px' }}>
      <div className="sing-in__container">
        <div className="sing-in__title">
          <h2>Sing In</h2>
        </div>
        <div className="sing-in__body">
          <form className="sing-in__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="sing-in__input-body">
              <label htmlFor="login" className="sing-in__label">
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
                className="sing-in__login"
                name="login"
                id="login"
              />

              <div className="sing-in__error">{showError(errors, 'login')}</div>
            </div>

            <div className="sing-in__input-body">
              <label htmlFor="login" className="sing-in__label">
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
                className="sing-in__password"
                name="password"
                id="password"
              />

              <div className="sing-in__error">{showError(errors, 'password')}</div>
            </div>

            <div className="sing-in__question">
              {`Have an account?`}
              <CustomLink className="sing-in__link" to={'/sing-up'}>
                Sing up
              </CustomLink>
            </div>
            <button type="submit" className="sing-in__button main-page-btn">
              Sing in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
