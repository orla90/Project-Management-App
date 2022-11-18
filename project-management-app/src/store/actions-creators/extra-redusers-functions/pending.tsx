import { IsignInitialState } from 'store/interfaces/sign-slice';

export const pendingSignUp = (state: IsignInitialState) => {
  state.overlay = true;
};
export const pendingSignIn = (state: IsignInitialState) => {
  state.overlay = true;
};
export const pendingSignEdit = (state: IsignInitialState) => {
  state.overlay = true;
};
