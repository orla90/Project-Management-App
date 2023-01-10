import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import boardListSlice from './slices/board-list-slice';
import boardSlice from './slices/board-slice';
import languageSlice from './slices/language-slice';
import signSlice from './slices/sign-slice';

export const rootReducer = combineReducers({
  boardListSlice,
  signSlice,
  languageSlice,
  boardSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
