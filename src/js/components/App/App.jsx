import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  placeOrder,
  resetOrder,
  setIngredientForDetails,
  removeCurrentIngredient,
} from "../../services/actions/actions";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function useModal(openAction, closeAction) {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const openModal = (...args) => {
    if (openAction) {
      dispatch(openAction(...args));
    }
    setOpen(true);
  };

  const closeModal = () => {
    if (closeAction) {
      dispatch(closeAction());
    }
    setOpen(false);
  };

  return { isOpen, openModal, closeModal };
}

function App() {
  const dispatch = useDispatch();

  const { order, currentIngredient, selectedIngredients } = useSelector(
    (state) => state.burger
  );

  const orderModal = useModal(placeOrder, resetOrder);
  const ingredientDetailsModal = useModal(
    setIngredientForDetails,
    removeCurrentIngredient
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={`${appStyle.container} pb-10`} id="react-modals">
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients onClick={ingredientDetailsModal.openModal} />
        <BurgerConstructor
          onClick={orderModal.openModal}
          selectedIngredients={selectedIngredients}
        />
      </main>

      {orderModal.isOpen && order && (
        <Modal onClose={orderModal.closeModal}>
          <OrderDetails orderNumber={order} />
        </Modal>
      )}

      {ingredientDetailsModal.isOpen && currentIngredient && (
        <Modal onClose={ingredientDetailsModal.closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
