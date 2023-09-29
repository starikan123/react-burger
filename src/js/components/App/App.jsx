import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeCurrentIngredient } from "../../services/actions/actions";
import {
  getIngredients,
  setIngredientForDetails,
} from "../../services/actions/ingredientsActions";
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
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

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
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [ingredientModalOpen, setIngredientModalOpen] = useState(false);

  useEffect(() => {
    if (
      !isAuthenticated &&
      currentIngredient &&
      Object.keys(currentIngredient).length > 0
    ) {
      setIngredientModalOpen(true);
    } else {
      setIngredientModalOpen(false);
    }
  }, [currentIngredient, isAuthenticated]);

  const orderModal = useModal(placeOrder, resetOrder);
  const ingredientDetailsModal = useModal(
    setIngredientForDetails,
    removeCurrentIngredient
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;

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
            <Route
              path="/ingredients/:id"
              element={
                background ? (
                  <></>
                ) : (
                  <IngredientDetails ingredient={currentIngredient} />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRouteElement>
                  <ProfilePage />
                </ProtectedRouteElement>
              }
            />

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

        {ingredientModalOpen && (
          <Modal onClose={() => setIngredientModalOpen(false)}>
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
