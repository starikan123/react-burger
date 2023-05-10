import React, { useMemo, useState } from "react";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.jsx";

function BurgerIngredients({ ingredientslist, onClick }) {
  const [current, setCurrent] = useState("bun");

  const filteredIngredients = useMemo(() => {
    return ingredientslist;
  }, [ingredientslist]);

  function handleSelectIngredient(ingredient) {
    onClick(ingredient);
  }

  return (
    <section
      className={`${ingredientsStyle.board} pt-10`}
      aria-label="ингредиенты"
    >
      <h1 className="text text_text text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div className={ingredientsStyle.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${ingredientsStyle.scroll} mt-10`}>
        <IngredientsBoard
          title="Булки"
          menu="bun"
          data={filteredIngredients}
          onClick={handleSelectIngredient}
        />
        <IngredientsBoard
          title="Соусы"
          menu="sauce"
          data={filteredIngredients}
          onClick={handleSelectIngredient}
        />
        <IngredientsBoard
          title="Начинки"
          menu="main"
          data={filteredIngredients}
          onClick={handleSelectIngredient}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientslist: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
