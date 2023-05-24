import React, { useContext } from "react";
import PropTypes from "prop-types";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./BurgerIngredients.module.css";
import { BurgerContext } from "../../services/BurgerContext";

function BurgerIngredients({ onClick }) {
  const [current, setCurrent] = React.useState("bun");

  const { ingredientslist, addIngredient } = useContext(BurgerContext);

  function handleSelectIngredient(ingredient) {
    addIngredient(ingredient);
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
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => setCurrent("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => setCurrent("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => setCurrent("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={`${ingredientsStyle.scroll} mt-10`}>
        <IngredientsBoard
          title="Булки"
          menu="bun"
          data={ingredientslist}
          onClick={handleSelectIngredient}
        />
        <IngredientsBoard
          title="Соусы"
          menu="sauce"
          data={ingredientslist}
          onClick={handleSelectIngredient}
        />
        <IngredientsBoard
          title="Начинки"
          menu="main"
          data={ingredientslist}
          onClick={handleSelectIngredient}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
