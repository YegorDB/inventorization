import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { TModalProps } from '../../types';

const modalRoot = document.getElementById('modals');

const Modal: FC<TModalProps> = ({
  handleClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      handleClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
