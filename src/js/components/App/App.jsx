import React, { useState, useEffect } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Api from "../../utils/api";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";
const api = new Api(baseUrl);

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = useState(false);
  const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => {
        setBurgerIngredients(data);
      })
      .catch(api.handleError);
  }, []);

  const openOrderModal = () => {
    setShowOpenOrderDetails(true);
  };

  const closeOrderModal = () => {
    setShowOpenOrderDetails(false);
  };

  const openIngredientDetailsModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setShowOpenIngredientDetails(true);
  };

  const closeIngredientDetailsModal = () => {
    setShowOpenIngredientDetails(false);
  };

  return (
    <div className={`${appStyle.container} pb-10`} id="react-modals">
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients
          ingredientslist={burgerIngredients}
          onClick={openIngredientDetailsModal}
        />
        <BurgerConstructor
          onClick={openOrderModal}
          ingredientslist={burgerIngredients}
          menu="bun"
        />
      </main>
      {showOpenOrderDetails && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {showOpenIngredientDetails && (
        <Modal onClose={closeIngredientDetailsModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
