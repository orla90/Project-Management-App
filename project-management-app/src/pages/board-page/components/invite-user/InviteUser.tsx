import CustomInput from 'components/UI/input/CustomInput';
import { showError } from 'pages/sing-pages/validation-functions';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IgetUserByID, inviteUserFetch } from 'store/actions-creators/invite-user/invite-user';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { Iuser } from 'store/interfaces/sign-slice';
import { boardSlice } from 'store/slices/board-slice';
import { i18ObjInviteUSer } from 'texts/board/invite-user';
import { key } from 'texts/footer/footer-text';
import { validationId } from './invite-validation-fn';
import './styles/invite-user.scss';
const InviteUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const { language } = useAppSelector((state) => state.signSlice);
  const { inviteUserError, isErrorOrTrue } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const { resetInviteUserError, updateUsersLogins } = boardSlice.actions;
  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const newUser = (await dispatch(inviteUserFetch({ ...e, dispatch } as IgetUserByID)))
      .payload as Iuser;
    if (newUser.login) {
      dispatch(
        updateUsersLogins({
          login: newUser.login,
          id: newUser._id!,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetInviteUserError());
    };
  }, [dispatch, resetInviteUserError]);
  return (
    <form
      className={`invite-user__form custom-form ${
        isErrorOrTrue ? 'true-response' : 'error-response'
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        label="ID"
        type={'text'}
        name={'id'}
        id={'id'}
        propsForm={{
          ...register('id', {
            required: true,
            validate: {
              customFn: (value) => validationId(value),
            },
          }),
        }}
        showErrorFn={showError}
        errors={errors}
        language={language}
      />
      <div className="invite-user__error-submit">{inviteUserError[language]}</div>

      <button type="submit" className="invite-user__button main-page-btn">
        {i18ObjInviteUSer[language as key].addButton}
      </button>
    </form>
  );
};

export default InviteUser;
