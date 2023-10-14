import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { modalPropType } from "../../utils/prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modalRender");

function Modal({ children, onClose, showCloseIcon = true }) {
  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [onClose]);

  const handleOverlayClick = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={handleOverlayClick}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modalContent}>
        {children}
        {showCloseIcon && (
          <div className={styles.closeIcon} onClick={onClose}>
            <CloseIcon type={"primary"} />
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = modalPropType;

export default Modal;
