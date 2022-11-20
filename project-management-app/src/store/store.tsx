import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import boardSlice from './slices/board-slice';
import languageSlice from './slices/language-slice';
import signSlice from './slices/sign-slice';

export const rootReducer = combineReducers({
  signSlice,
  languageSlice,
  boardSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
