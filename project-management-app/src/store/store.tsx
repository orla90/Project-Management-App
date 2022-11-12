import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import signSlice from './slices/sign-slice';
export const rootReducer = combineReducers({
  signSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
