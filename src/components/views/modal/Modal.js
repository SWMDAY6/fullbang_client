import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../../../context';

const Modal = (props) => {
  const { isModalOpen, ModalName, closeModal } = useGlobalContext();

  return (
    <div
      className={`${
        isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'
      }`}
    >
      <div className="modal-container">
        <h3>{props.name}</h3>
        {/* 나기기 버튼 */}
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
