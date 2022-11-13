import React from 'react';
import Modal from '../modal/Modal';
import './newBoardModal.scss';

interface INewBoardModalProps {
  open: boolean;
  onClose: () => void;
}

function NewBoardModal(props: INewBoardModalProps) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="form-container">
        <div className="create-board__title">
          <h2>Create board</h2>
        </div>
        <form className="create-board__form">
          <div className="input-body">
            <label className="create-board__label">Title</label>
            <input type="text"></input>
            <div className="form-error"></div>
          </div>
          <div className="input-body">
            <label>Description</label>
            <textarea rows={4}></textarea>
            <div className="form-error"></div>
          </div>
          <div>
            <button className="main-page-btn close-btn" onClick={props.onClose}>
              CLOSE
            </button>
            <button className="main-page-btn">CREATE</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NewBoardModal;
