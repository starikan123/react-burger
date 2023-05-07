import React, { useState } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import ingredientsData from "../../utils/data.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Api from "../../utils/api";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

const api = new Api(baseUrl);

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);

  function handleIngredientClick(ingredient) {
    setBurgerIngredients([...burgerIngredients, ingredient]);
  }

  React.useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => {
        setBurgerIngredients(data);
      })
      .catch(api.handleError);
  }, []);

  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients
          ingredientslist={ingredientsData}
          onClick={handleIngredientClick}
        />
        <BurgerConstructor ingredientslist={ingredientsData} menu="bun" />
      </main>
    </div>
  );
}

export default App;
