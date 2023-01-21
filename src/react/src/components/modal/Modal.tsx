import React, { FC, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TModalProps, TModalHeaderProps } from '../../types';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

const ModalHeader: FC<TModalHeaderProps> = ({
  closeHandler,
  title,
}) => {
  return (
    <div className={styles.ModalHeader}>
      <p className={styles.ModalHeaderTitle}>{title}</p>
      <div onClick={closeHandler} className={styles.ModalHeaderClose}>
        Close
      </div>
    </div>
  );
}

const Modal: FC<TModalProps> = ({
  handleClose,
  children,
  title,
}) => {
  const closeHandler = useCallback(
    () => handleClose(),
    [handleClose]
  );

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
      <div className={styles.Modal}>
        <ModalHeader closeHandler={closeHandler} title={title} />
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
