import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
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
      <div className="modal" onClick={onClose}>
        <div className="modal__content">{props.children}</div>
      </div>,
      element
    );
  }

  return null;
}

export default Modal;
