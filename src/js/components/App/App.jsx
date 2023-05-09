import React, { useState } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Api from "../../utils/api";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import Modal from "../Modal/Modal.jsx";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

const api = new Api(baseUrl);

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = useState(false);

  React.useEffect(() => {
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

  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients ingredientslist={burgerIngredients} />
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
    </div>
  );
}

export default App;
