import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

interface PortalProps {
  children?: React.ReactNode;
}

const Portal: React.FunctionComponent<PortalProps> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [modalRoot, el]);

  return ReactDOM.createPortal(children, el);
};

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps> = ({ onClose, children }) => (
  <Portal>
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.content}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  </Portal>
);

export default Modal;
