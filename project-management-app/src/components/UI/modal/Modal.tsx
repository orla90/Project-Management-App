import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IModalProps } from './interfaces/IModalProps';
import './modal.scss';

const modalRootElement = document.querySelector('#modal-root')!;

function Modal(props: IModalProps) {
  const { open, onClose } = props;
  const element = useMemo(() => document.createElement('div'), []);

  const closeModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal')) onClose();
  };

  useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);
      document.body.classList.add('_lock');
      return () => {
        modalRootElement.removeChild(element);
        document.body.classList.remove('_lock');
      };
    }
  }, [element, open]);

  if (open) {
    return createPortal(
      <div className="modal" onClick={closeModal}>
        <div className="modal__content">
          <div className="modal__title">
            <h2>{props.title}</h2>
            <div className="modal__close-btn" onClick={onClose}>
              &times;
            </div>
          </div>
          <div className="modal__body">{props.children}</div>
        </div>
      </div>,
      element
    );
  }

  return null;
}

export default Modal;
