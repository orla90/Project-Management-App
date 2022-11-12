import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import languageSlice from './slices/language-slice';
import signSlice from './slices/sign-slice';

export const rootReducer = combineReducers({
  signSlice,
  languageSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
