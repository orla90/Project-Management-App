import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_END_URL } from 'constants/back-end-link';
import { IeditProfileProps } from 'store/interfaces/edit-profile';
import { Iuser } from 'store/interfaces/sign-slice';
import { ERRORS_CODE } from 'constants/errors';
import { toast } from 'react-toastify';
import i18Obj from 'texts/errors-and-warnings/translate';

export const editProfileFetch = createAsyncThunk<
  Iuser,
  IeditProfileProps,
  {
    rejectValue: number;
  }
>('user/editProfileFetch', async (props, { rejectWithValue }) => {
  const { login, name, password, id, token } = props;
  return axios
    .put(
      `${BACK_END_URL}users/${id}`,
      {
        name: name,
        login: login,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      if (response.status === ERRORS_CODE.GOOD_RESPONSE_CODE) {
        toast.success(`${i18Obj[props.lang!].goodResponseEditProfile}`);
      }
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (error.code === ERRORS_CODE.BAD_REQUEST) {
        toast.error(`${i18Obj[props.lang!].badRequestEditProfile}`);
      }
      return rejectWithValue(error.response.data.statusCode);
    });
});
