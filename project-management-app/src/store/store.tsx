import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import boardListSlice from './slices/board-list-slice';
import languageSlice from './slices/language-slice';
import signSlice from './slices/sign-slice';

export const rootReducer = combineReducers({
  boardListSlice,
  signSlice,
  languageSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
