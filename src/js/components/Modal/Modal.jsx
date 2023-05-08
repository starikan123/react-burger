import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = (props) => {
  const { children, onClose } = props;
  const modalRootElement = React.useMemo(
    () => document.querySelector("#react-modals"),
    []
  );

  const handleClose = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    document.addEventListener("keyup", handleClose);
    return () => document.removeEventListener("keyup", handleClose);
  }, [handleClose]);

  const closeIcon = React.useMemo(() => <CloseIcon type="primary" />, []);

  const content = React.Children.only(children);

  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyle.container} pr-10 pl-10`}>
        <button
          onClick={onClose}
          className={`${ModalStyle.leave} pt-15 pr-10`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
        >
          {closeIcon}
        </button>
        {content}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRootElement
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
