import PropTypes from "prop-types";
import ModalOverlayStyle from "./ModalOverlay.module.css";
import React from "react";

const ModalOverlay = ({ onClick }) => (
  <div onClick={onClick} className={ModalOverlayStyle.overlay}></div>
);

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(ModalOverlay);
