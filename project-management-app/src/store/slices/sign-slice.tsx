import { createSlice } from '@reduxjs/toolkit';
import { editProfileFetch } from 'store/actions-creators/edit-profile/edit-profile';
import { parseJwt } from 'store/actions-creators/sing-in-sing-up/decode-token';
import { signInFetch } from 'store/actions-creators/sing-in-sing-up/sign-in-action';
import { signUpFetch } from 'store/actions-creators/sing-in-sing-up/sign-up-action';
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

const initialState = {
  user: getUserData(),
  errorRegistration: i18ObjSingFetchResponses.empty,
  errorLogin: i18ObjSingFetchResponses.empty,
  editMessage: i18ObjSingFetchResponses.empty,
  trueOrfalseEdit: false,
  overlay: false,
  language: localStorage.getItem('language') || 'en',
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

    builder.addCase(signInFetch.fulfilled, (state, action) => {
      const decodeToken = parseJwt(action.payload.token);
      const newUser = { ...decodeToken, token: action.payload.token };
      localStorage.setItem('user', JSON.stringify(newUser));
      state.user = newUser;
      state.errorLogin = i18ObjSingFetchResponses.empty;
      state.errorRegistration = i18ObjSingFetchResponses.empty;
      state.overlay = false;
    });

    builder.addCase(signInFetch.rejected, (state, action) => {
      const { payload } = action;
      if (payload === 401) state.errorLogin = i18ObjSingFetchResponses.singInReject401;
      if (payload === 400) state.errorLogin = i18ObjSingFetchResponses.singInReject400;
      state.overlay = false;
    });

    builder.addCase(editProfileFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(editProfileFetch.fulfilled, (state, action) => {
      state.editMessage = i18ObjSingFetchResponses.editProfileFulifilled;
      state.overlay = false;
      state.trueOrfalseEdit = true;
      state.user.login = action.payload.login;
      localStorage.setItem('user', JSON.stringify(state.user));
    });

    builder.addCase(editProfileFetch.rejected, (state, action) => {
      const { payload } = action;
      console.log(payload);

      if (payload === 409) {
        state.editMessage = i18ObjSingFetchResponses.editProfileReject409;
      } else {
        state.editMessage = i18ObjSingFetchResponses.editProfileReject;
      }
      state.overlay = false;
      state.trueOrfalseEdit = false;
    });
  },
});

export default signSlice.reducer;
