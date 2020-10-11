import React from 'react';

function Modal({ showModal, handleShowModal, children }) {
  return (
    <div className={`modal ${showModal && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <section className="modal-card-body">{children}</section>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={handleShowModal}
      ></button>
    </div>
  );
}

export default Modal;
