import Modal from 'components/UI/modal/Modal';
import React from 'react';
import { deleteUserFetch } from 'store/actions-creators/edit-profile/delete-user';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks';
import { key } from 'texts/header/header-text';
import { i18ObjSign } from 'texts/sign/sing-text';
const DeleteUser = ({ open, onClose }: { open: true | false; onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.signSlice);
  const { language } = useAppSelector((state) => state.languageSlice);
  const removeUser = () => {
    dispatch(deleteUserFetch(user!));
  };
  return (
    <Modal open={open} title={i18ObjSign[language as key].deleteUserTitle} onClose={onClose}>
      <div className="delete-user-modal">
        <button onClick={removeUser} className="delete-user-modal__button-sybmit main-page-btn">
          {i18ObjSign[language as key].submit}
        </button>
        <button onClick={onClose} className="delete-user-modal__button-close main-page-btn-accent">
          {i18ObjSign[language as key].close}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUser;
