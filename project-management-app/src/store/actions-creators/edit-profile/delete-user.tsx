import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACK_END_URL } from 'constants/back-end-link';
import { IdeleteUser } from 'store/interfaces/delete-user';
import { Iuser, IuserAndLang } from 'store/interfaces/sign-slice';
import { ERRORS_CODE } from 'constants/errors';
import { toast } from 'react-toastify';
import i18Obj from 'texts/errors-and-warnings/translate';

export const deleteUserFetch = createAsyncThunk<
  IdeleteUser,
  Iuser,
  // IuserAndLang,
  {
    rejectValue: number;
  }
>('user/deleteUserFetch', async (props, { rejectWithValue }) => {
  const { id, token } = props;
  return (
    axios
      .delete(`${BACK_END_URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      // .delete(`${BACK_END_URL}users/${props.user!.id}`, {
      //   headers: {
      //     Authorization: `Bearer ${props.user!.token}`,
      //     Accept: 'application/json',
      //   },
      // })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // if (error.code === ERRORS_CODE.BAD_REQUEST) {
        //   toast.error(`${i18Obj[props.lang!].badRequestDeleteUser}`);
        // }
        return rejectWithValue(error.response.data.statusCode);
      })
  );
});
