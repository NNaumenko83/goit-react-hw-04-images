import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, LargeImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <LargeImage>{children}</LargeImage>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
