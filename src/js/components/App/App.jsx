import React, { useEffect, useReducer } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Api from "../../utils/api";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { BurgerContext } from "../../services/BurgerContext";

const baseUrl = "https://norma.nomoreparties.space/api";

const api = new Api(baseUrl);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      if (action.ingredient.type === "bun") {
        const totalPrice =
          state.totalPrice -
          (state.bun ? state.bun.price * 2 : 0) +
          action.ingredient.price * 2;
        return {
          ...state,
          bun: action.ingredient,
          totalPrice: totalPrice,
        };
      } else {
        return {
          ...state,
          other: [...state.other, action.ingredient],
          totalPrice: state.totalPrice + action.ingredient.price,
        };
      }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

function App() {
  const [burgerIngredients, setBurgerIngredients] = React.useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = React.useState(false);
  const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
    React.useState(false);
  const [selectedIngredientForDetails, setSelectedIngredientForDetails] =
    React.useState(null);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const [selectedIngredients, dispatch] = useReducer(reducer, {
    bun: null,
    other: [],
    totalPrice: 0,
  });

  useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => {
        setBurgerIngredients(data);
      })
      .catch(api.handleError);
  }, []);

  const addIngredient = (ingredient) => {
    dispatch({ type: "ADD_INGREDIENT", ingredient });
  };

  const contextValue = {
    ingredientslist: burgerIngredients,
    addIngredient,
    selectedIngredients,
    totalPrice: selectedIngredients.totalPrice,
    createOrder: () => {
      const ingredientIds = [
        ...selectedIngredients.other.map((item) => item._id),
        selectedIngredients.bun._id,
      ];
      return api.createOrder(ingredientIds);
    },
  };

  const openOrderModal = (orderNumber) => {
    setOrderNumber(orderNumber);
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
            <OrderDetails orderNumber={orderNumber} />
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
