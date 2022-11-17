import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { IeditProfileProps } from 'store/interfaces/edit-profile';
import { rootReducer, setupStore } from '../store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type CustomAction = PayloadAction<
  number,
  string,
  {
    arg: IeditProfileProps;
    requestId: string;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | {
        rejectedWithValue: false;
      }
  ),
  SerializedError
>;
