import PropTypes from "prop-types";
import React from "react";
import ModalOverlayStyle from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClick }) => (
  <div onClick={onClick} className={ModalOverlayStyle.overlay}></div>
);

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(ModalOverlay);
