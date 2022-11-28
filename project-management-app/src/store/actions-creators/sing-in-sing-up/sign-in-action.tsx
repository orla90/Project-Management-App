import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACK_END_URL } from 'constants/back-end-link';
import { ERRORS_CODE } from 'constants/errors';
import { toast } from 'react-toastify';
import { IsignProps } from 'store/interfaces/sign-up-props';
import i18Obj from 'texts/errors-and-warnings/translate';

export const signInFetch = createAsyncThunk<
  { token: string },
  IsignProps,
  {
    rejectValue: number;
  }
>('user/signInFetch', async (props: IsignProps, { rejectWithValue }) => {
  const { login, password } = props;
  return axios
    .post(`${BACK_END_URL}auth/signin`, {
      login: login,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.code === ERRORS_CODE.BAD_REQUEST) {
        toast.error(`${i18Obj[props.lang!].badRequestUserSignIn}`);
      }
      return rejectWithValue(error.response.data.statusCode);
    });
});
