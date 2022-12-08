import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";

const Modal = () => {
  const { isOpen, toggle, modal } = useContext(ModalContext);
  const { title, content, actionLabel, action } = modal;
  return (
    <>
      {isOpen && (
        <div className='modal-background' onClick={toggle}>
          <div className='modal-container' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <b>{title}</b>
            </div>
            <div className='modal-body'>{content}</div>
            <div className='modal-cta'>
              <button onClick={toggle}>Cancel</button>
              <button onClick={action}>{actionLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
