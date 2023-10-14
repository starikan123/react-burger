import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { checkUserAuth } from "../../services/api";
import { getIngredients } from "../../services/actions/burgerIngredients";
import { getCookie } from "../../services/utils";
import AppHeader from "../App-header/App-header";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Login from "../../pages/login/login";
import Homepage from "../../pages/home/home";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import Feed from "../../pages/feed/feed";
import ProfileForm from "../ProfileForm/ProfileForm";
import Profile from "../../pages/profile/profile";
import OrderFeed from "../OrderFeed/OrderFeed";
import OrderDescription from "../OrderDescription/OrderDescription";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const { state } = useLocation();
  const background = state?.background;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken")?.split(" ")[1];

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="app pt-10 pb-10">
      <AppHeader />
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:orderNumber" element={<OrderDescription />} />
          <Route
            path="/profile/orders/:orderNumber"
            element={<OnlyAuth component={<OrderDescription />} />}
          />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileForm />} />
            <Route
              path="/profile/orders"
              element={
                <OrderFeed
                  feedPersonal={true}
                  wsUrl={`wss://norma.nomoreparties.space/orders?token=${accessToken}`}
                />
              }
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:orderNumber"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDescription isModal />
                </Modal>
              }
            />
            <Route
              path="/feed/:orderNumber"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDescription isModal />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
