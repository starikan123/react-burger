import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import IngredientDetailPage from "../IngredientDetailPage/IngredientDetailPage";
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
import { getCookie } from "../../utils/cookieHelpers";
import { loginSuccess, getUser } from "../../services/actions/authActions";

function useModal(openAction, closeAction) {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const openModal = useCallback(
    (...args) => {
      if (openAction) {
        dispatch(openAction(...args));
      }
      setOpen(true);
    },
    [dispatch, openAction]
  );

  const closeModal = useCallback(() => {
    if (closeAction) {
      dispatch(closeAction());
    }
    setOpen(false);
  }, [dispatch, closeAction]);

  return { isOpen, openModal, closeModal };
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

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

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      const accessToken = getCookie("accessToken");
      dispatch(loginSuccess(null, accessToken, refreshToken));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleCloseIngredientModal = () => {
    navigate(-1);
  };

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
          <Routes location={background || location}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/ingredients/:id" element={<IngredientDetailPage />} />

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

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={handleCloseIngredientModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
