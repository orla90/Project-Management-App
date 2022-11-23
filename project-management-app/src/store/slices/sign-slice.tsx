import { createSlice } from '@reduxjs/toolkit';
import { deleteUserFetch } from 'store/actions-creators/edit-profile/delete-user';
import { editProfileFetch } from 'store/actions-creators/edit-profile/edit-user';
import {
  fulfilledSignIn,
  fulfilledEdit,
  fulfilledSignUp,
  fulfilledDeleteUser,
} from 'store/actions-creators/extra-redusers-functions/fulfilled';
import {
  pendingSignEdit,
  pendingSignIn,
  pendingSignUp,
  pendingDeleteUser,
} from 'store/actions-creators/extra-redusers-functions/pending';
import {
  rejectedEdit,
  rejectedSignIn,
  rejectedSignUp,
  rejectedDeleteUser,
} from 'store/actions-creators/extra-redusers-functions/rejected';
import { signInFetch } from 'store/actions-creators/sing-in-sing-up/sign-in-action';
import { signUpFetch } from 'store/actions-creators/sing-in-sing-up/sign-up-action';
import { IsignInitialState } from 'store/interfaces/sign-slice';
import { i18ObjSingFetchResponses } from 'texts/sign/sing-fetch-responses-text';

function getUserData() {
  const nowTime = Math.floor(Date.now() / 1000);
  const userData = localStorage.getItem('user');
  if (userData) {
    const dateEndToken = JSON.parse(userData).exp;
    if (dateEndToken > nowTime) {
      return JSON.parse(userData);
    } else {
      localStorage.removeItem('user');
      return null;
    }
  } else {
    return null;
  }
}

const initialState: IsignInitialState = {
  user: getUserData(),
  errorRegistration: i18ObjSingFetchResponses.empty,
  errorLogin: i18ObjSingFetchResponses.empty,
  editMessage: { en: 'asdasd', ru: 'adasdasd' },
  trueOrfalseEdit: false,
  overlay: false,
  language: (localStorage.getItem('language') as 'en' | 'ru') || 'en',
};

export const signSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {
    setSubmitErrorLogin: (state, action) => {
      state.errorLogin = action.payload;
    },
    setSubmitErrorRegistration: (state, action) => {
      state.errorRegistration = action.payload;
    },
    setEditMessage: (state, action) => {
      state.editMessage = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setLanguageSign: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpFetch.pending, pendingSignUp);
    builder.addCase(signUpFetch.fulfilled, fulfilledSignUp);
    builder.addCase(signUpFetch.rejected, rejectedSignUp);

    builder.addCase(signInFetch.pending, pendingSignIn);
    builder.addCase(signInFetch.fulfilled, fulfilledSignIn);
    builder.addCase(signInFetch.rejected, rejectedSignIn);

    builder.addCase(editProfileFetch.pending, pendingSignEdit);
    builder.addCase(editProfileFetch.fulfilled, fulfilledEdit);
    builder.addCase(editProfileFetch.rejected, rejectedEdit);

    builder.addCase(deleteUserFetch.pending, pendingDeleteUser);
    builder.addCase(deleteUserFetch.fulfilled, fulfilledDeleteUser);
    builder.addCase(deleteUserFetch.rejected, rejectedDeleteUser);
  },
});

export default signSlice.reducer;
