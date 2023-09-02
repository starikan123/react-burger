import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentIngredient,
  setCurrentIngredient,
} from "../../services/actions/ingredientsActions";

const modalRootElement = document.querySelector("#react-modals");

const Modal = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { ingredients } = useSelector((state) => state.ingredients);

  const handleClose = React.useCallback(
    (e) => {
      if (e.key === "Escape" || e.type === "click") {
        if (isAuthenticated) {
          dispatch(resetCurrentIngredient());
        } else {
          navigate("/");
        }
        props.onClose();
      }
    },
    [dispatch, props.onClose, isAuthenticated, navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [handleClose]);

  useEffect(() => {
    if (!isAuthenticated) {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [isAuthenticated, id, ingredients, dispatch]);

  const closeIcon = <CloseIcon type="primary" />;

  const content = React.Children.only(props.children);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${ModalStyle.container} pr-10 pl-10`}>
          <button
            onClick={handleClose}
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
      <ModalOverlay onClick={handleClose} />
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
