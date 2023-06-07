import React, { useEffect } from "react";
import PropTypes from "prop-types";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  addIngredientToConstructor,
} from "../../services/actions/actions";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredients = useSelector((state) => state.burger.ingredients);

  const handleSelectIngredient = (ingredient) => {
    dispatch(addIngredientToConstructor(ingredient));
  };

  return (
    <section
      className={`${ingredientsStyle.board} pt-10`}
      aria-label="ингредиенты"
    >
      <h1 className="text text_text text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div className={ingredientsStyle.tabs}>
        <Tab value="bun" onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauce" onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="main" onClick={() => {}}>
          Начинки
        </Tab>
      </div>

      <div className={`${ingredientsStyle.scroll} mt-10`}>
        {ingredients && (
          <IngredientsBoard
            title="Булки"
            menu="bun"
            data={ingredients.filter((ingredient) => ingredient.type === "bun")}
            onClick={handleSelectIngredient}
          />
        )}
        {ingredients && (
          <IngredientsBoard
            title="Соусы"
            menu="sauce"
            data={ingredients.filter(
              (ingredient) => ingredient.type === "sauce"
            )}
            onClick={handleSelectIngredient}
          />
        )}
        {ingredients && (
          <IngredientsBoard
            title="Начинки"
            menu="main"
            data={ingredients.filter(
              (ingredient) => ingredient.type === "main"
            )}
            onClick={handleSelectIngredient}
          />
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;
