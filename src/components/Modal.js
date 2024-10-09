import { createPortal } from 'react-dom';
import './Modal.css'; // Importamos los estilos

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          {children}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
