import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIngredientForDetails,
  removeCurrentIngredient,
} from "../../services/actions/actions";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { placeOrder, resetOrder } from "../../services/actions/orderActions";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../../../pages/LoginPage";
import RegisterPage from "../../../pages/RegisterPage";
import ForgotPasswordPage from "../../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../../pages/ResetPasswordPage";
import ProfilePage from "../../../pages/ProfilePage";

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

  const { order, orderNumber } = useSelector((state) => state.order);
  const { currentIngredient } = useSelector((state) => state.ingredients);
  const { selectedIngredients } = useSelector((state) => state.constructor);

  const orderModal = useModal(placeOrder, resetOrder);
  const ingredientDetailsModal = useModal(
    setIngredientForDetails,
    removeCurrentIngredient
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${appStyle.container} pb-10`} id="react-modals">
        <AppHeader />
        <main className={appStyle.section}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/"
              element={
                <>
                  <BurgerIngredients
                    onClick={ingredientDetailsModal.openModal}
                  />
                  <BurgerConstructor
                    onClick={orderModal.openModal}
                    selectedIngredients={selectedIngredients}
                  />
                </>
              }
            />
          </Routes>
        </main>

        {orderModal.isOpen && order && (
          <Modal onClose={orderModal.closeModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}

        {ingredientDetailsModal.isOpen && currentIngredient && (
          <Modal onClose={ingredientDetailsModal.closeModal}>
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
