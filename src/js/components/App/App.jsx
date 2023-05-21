import React, { useState, useEffect, useMemo } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Api from "../../utils/api";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { BurgerContext } from "../../services/BurgerContext";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";
const api = new Api(baseUrl);

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = useState(false);
  const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
    useState(false);
  const [selectedIngredientForDetails, setSelectedIngredientForDetails] =
    useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState({
    bun: null,
    other: [],
  });

  const addIngredient = (ingredient) => {
    setSelectedIngredients((prevIngredients) => {
      if (ingredient.type === "bun") {
        return { ...prevIngredients, bun: ingredient };
      }
      return {
        ...prevIngredients,
        other: [...prevIngredients.other, ingredient],
      };
    });
  };

  const totalPrice = useMemo(() => {
    let total = selectedIngredients.bun ? selectedIngredients.bun.price : 0;
    total += selectedIngredients.other.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return total;
  }, [selectedIngredients]);

  const contextValue = {
    ingredientslist: burgerIngredients,
    addIngredient,
    selectedIngredients,
    totalPrice,
  };

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
    setSelectedIngredientForDetails(ingredient);
    setShowOpenIngredientDetails(true);
  };

  const closeIngredientDetailsModal = () => {
    setShowOpenIngredientDetails(false);
  };

  return (
    <BurgerContext.Provider value={contextValue}>
      <div className={`${appStyle.container} pb-10`} id="react-modals">
        <AppHeader />
        <main className={appStyle.section}>
          <BurgerIngredients
            onClick={openIngredientDetailsModal}
            ingredientslist={burgerIngredients}
            addIngredient={addIngredient}
          />
          <BurgerConstructor onClick={openOrderModal} />
        </main>
        {showOpenOrderDetails && (
          <Modal onClose={closeOrderModal}>
            <OrderDetails />
          </Modal>
        )}
        {showOpenIngredientDetails && (
          <Modal onClose={closeIngredientDetailsModal}>
            <IngredientDetails ingredient={selectedIngredientForDetails} />
          </Modal>
        )}
      </div>
    </BurgerContext.Provider>
  );
}

export default App;
