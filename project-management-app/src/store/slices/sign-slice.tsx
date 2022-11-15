import { createSlice } from '@reduxjs/toolkit';
import { decode } from 'punycode';
import { parseJwt } from 'store/actions-creators/sing-in-sing-up/decode-token';
import { signInFetch } from 'store/actions-creators/sing-in-sing-up/sign-in-action';
import { signUpFetch } from 'store/actions-creators/sing-in-sing-up/sign-up-action';

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
  errorRegistration: '',
  errorLogin: '',
  overlay: false,
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
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(signUpFetch.fulfilled, (state, action) => {
      console.log('Сработал fulfilled up', action.payload);
      state.overlay = false;
    });

    builder.addCase(signUpFetch.rejected, (state, action) => {
      const { payload } = action;
      if (payload === 409) {
        state.errorRegistration = 'This user is already registered';
      } else {
        state.errorRegistration = 'Something went wrong...';
      }
      state.overlay = false;
      console.log('Сработал reject up', action.payload);
    });

    builder.addCase(signInFetch.pending, (state) => {
      state.overlay = true;
    });

    builder.addCase(signInFetch.fulfilled, (state, action) => {
      const decodeToken = { ...parseJwt(action.payload.token), token: action.payload.token };
      localStorage.setItem('user', JSON.stringify(decodeToken));
      state.user = decodeToken;
      state.errorLogin = '';
      state.errorRegistration = '';
      state.overlay = false;
      console.log('Сработал fulfilled in', decodeToken);
    });

    builder.addCase(signInFetch.rejected, (state, action) => {
      const { payload } = action;
      if (payload === 401) state.errorLogin = 'Wrong login or password';
      if (payload === 400) state.errorLogin = 'Something went wrong...';
      state.overlay = false;
    });
  },
});

export default signSlice.reducer;
