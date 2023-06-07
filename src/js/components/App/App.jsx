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

function App() {
  const dispatch = useDispatch();
  const { ingredients, order, currentIngredient, selectedIngredients } =
    useSelector((state) => state.burger);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] =
    useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const openOrderModal = () => {
    if (selectedIngredients.length > 0) {
      const ingredientIds = selectedIngredients.map((item) => item._id);
      dispatch(placeOrder(ingredientIds));
      setOrderModalOpen(true);
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    setOrderModalOpen(false);
  };

  const openIngredientDetailsModal = (ingredient) => {
    dispatch(setIngredientForDetails(ingredient));
    setIngredientDetailsModalOpen(true);
  };

  const closeIngredientDetailsModal = () => {
    dispatch(removeCurrentIngredient());
    setIngredientDetailsModalOpen(false);
  };

  return (
    <div className={`${appStyle.container} pb-10`} id="react-modals">
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients onClick={openIngredientDetailsModal} />
        <BurgerConstructor
          onClick={openOrderModal}
          selectedIngredients={selectedIngredients}
        />
      </main>
      {isOrderModalOpen && order && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderNumber={order} />
        </Modal>
      )}
      {isIngredientDetailsModalOpen && currentIngredient && (
        <Modal onClose={closeIngredientDetailsModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
