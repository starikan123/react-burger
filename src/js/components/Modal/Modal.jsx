import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeCurrentIngredient } from "../../services/actions/actions";

const modalRootElement = document.querySelector("#react-modals");

const Modal = (props) => {
  const dispatch = useDispatch();

  const handleClose = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        dispatch(removeCurrentIngredient());
        props.onClose();
      }
    },
    [dispatch, props.onClose]
  );

  React.useEffect(() => {
    document.addEventListener("keyup", handleClose);
    return () => document.removeEventListener("keyup", handleClose);
  }, [handleClose]);

  const closeIcon = <CloseIcon type="primary" />;

  const content = React.Children.only(props.children);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${ModalStyle.container} pr-10 pl-10`}>
          <button
            onClick={props.onClose}
            className={`${ModalStyle.leave} pt-15 pr-10`}
            type="button"
            title="Закрыть окно"
            aria-label="Закрыть окно"
          >
            {closeIcon}
          </button>
          {content}
        </div>,
        modalRootElement
      )}
      <ModalOverlay onClick={props.onClose} />
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
