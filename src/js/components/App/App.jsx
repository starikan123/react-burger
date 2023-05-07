import React, { useState } from "react";
import AppHeader from "../App-header/App-header";
import appStyle from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import ingredientsData from "../../utils/data.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);

  function handleIngredientClick(ingredient) {
    setBurgerIngredients([...burgerIngredients, ingredient]);
  }

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
