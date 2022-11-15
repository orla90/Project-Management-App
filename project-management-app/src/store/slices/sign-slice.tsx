import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editProfileFetch } from 'store/actions-creators/edit-profile/edit-profile';
import {
  fulfilledSignIn,
  fulfilledEdit,
} from 'store/actions-creators/edit-profile/extra-redusers-functions/fulfilled';
import {
  rejectedEdit,
  rejectedSignIn,
} from 'store/actions-creators/edit-profile/extra-redusers-functions/rejected';
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
  editMessage: i18ObjSingFetchResponses.empty,
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
    builder.addCase(signUpFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(signUpFetch.fulfilled, (state) => {
      state.overlay = false;
    });

    builder.addCase(signUpFetch.rejected, (state, action) => {
      const { payload } = action;
      if (payload === 409) {
        state.errorRegistration = i18ObjSingFetchResponses.singUpReject409;
      } else {
        state.errorRegistration = i18ObjSingFetchResponses.singUpReject;
      }
      state.overlay = false;
    });

    builder.addCase(signInFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(signInFetch.fulfilled, fulfilledSignIn);

    builder.addCase(signInFetch.rejected, rejectedSignIn);

    builder.addCase(editProfileFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(editProfileFetch.fulfilled, fulfilledEdit);

    builder.addCase(editProfileFetch.rejected, rejectedEdit);
  },
});

export default signSlice.reducer;
