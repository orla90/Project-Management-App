import { PayloadAction } from '@reduxjs/toolkit';
import { IsignInitialState } from 'store/interfaces/sign-slice';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';

export const rejectedEdit = (
  state: IsignInitialState,
  action: PayloadAction<number | undefined>
) => {
  const { payload } = action;
  if (payload === 409) {
    state.editMessage = i18ObjSingFetchResponses.editProfileReject409;
  } else {
    state.editMessage = i18ObjSingFetchResponses.editProfileReject;
  }
  state.overlay = false;
  state.trueOrfalseEdit = false;
};

export const rejectedSignIn = (
  state: IsignInitialState,
  action: PayloadAction<number | undefined>
) => {
  const { payload } = action;
  if (payload === 401) state.errorLogin = i18ObjSingFetchResponses.singInReject401;
  if (payload === 400) state.errorLogin = i18ObjSingFetchResponses.singInReject400;
  state.overlay = false;
};

export const rejectedSignUp = (
  state: IsignInitialState,
  action: PayloadAction<number | undefined>
) => {
  const { payload } = action;
  if (payload === 409) {
    state.errorRegistration = i18ObjSingFetchResponses.singUpReject409;
  } else {
    state.errorRegistration = i18ObjSingFetchResponses.singUpReject;
  }
  state.overlay = false;
};
