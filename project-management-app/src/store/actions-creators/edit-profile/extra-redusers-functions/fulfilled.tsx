import { PayloadAction } from '@reduxjs/toolkit';
import { parseJwt } from 'store/actions-creators/sing-in-sing-up/decode-token';
import { IsignInitialState, Iuser } from 'store/interfaces/sign-slice';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';

export const fulfilledEdit = (state: IsignInitialState, action: PayloadAction<Iuser>) => {
  state.editMessage = i18ObjSingFetchResponses.editProfileFulifilled;
  state.overlay = false;
  state.trueOrfalseEdit = true;
  if (state.user) state.user.login = action.payload.login as string;
  localStorage.setItem('user', JSON.stringify(state.user));
};

export const fulfilledSignIn = (
  state: IsignInitialState,
  action: PayloadAction<{ token: string }>
) => {
  const decodeToken = parseJwt(action.payload.token);
  const newUser = { ...decodeToken, token: action.payload.token };
  localStorage.setItem('user', JSON.stringify(newUser));
  state.user = newUser;
  state.errorLogin = i18ObjSingFetchResponses.empty;
  state.errorRegistration = i18ObjSingFetchResponses.empty;
  state.overlay = false;
};
