import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

interface IModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const modalRootElement = document.querySelector('#modal-root')!;

function Modal(props: IModalProps) {
  const { open, onClose } = props;
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);

      return () => {
        modalRootElement.removeChild(element);
      };
    }
  });

  if (open) {
    return createPortal(
      <div className="modal">
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
