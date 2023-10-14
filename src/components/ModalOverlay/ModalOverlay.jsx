import React from "react";
import styles from "../ModalOverlay/ModalOverlay.module.css";
import { modalOverlayPropType } from "../../utils/prop-types";

const ModalOverlay = ({ onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className={styles.overlayContainer} onClick={handleOverlayClick}></div>
  );
};

ModalOverlay.propTypes = modalOverlayPropType;

export default ModalOverlay;
