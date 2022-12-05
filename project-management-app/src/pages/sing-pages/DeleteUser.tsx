import Modal from 'components/UI/modal/Modal';
import { Language } from 'pages/welcome-page/types/types';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { deleteUserFetch } from 'store/actions-creators/edit-profile/delete-user';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { key } from 'texts/header/header-text';
import { i18ObjSign } from 'texts/sign/sing-text';
const DeleteUser = ({ open, onClose }: { open: true | false; onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.signSlice);
  const { language } = useAppSelector((state) => state.languageSlice);
  const removeUser = () => {
    dispatch(deleteUserFetch({ user: user, lang: lang }));
  };
  const lang = language.toString() as Language;
  return (
    <Modal open={open} title={i18ObjSign[language as key].deleteUserTitle} onClose={onClose}>
      <div className="delete-user-modal">
        <button
          onClick={removeUser}
          className="delete-user-modal__button-sybmit main-page-btn-accent"
        >
          {i18ObjSign[language as key].submit}
        </button>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default DeleteUser;
