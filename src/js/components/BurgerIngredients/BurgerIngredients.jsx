import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredientToConstructor } from "../../services/actions/constructorActions.js";
import { getIngredients } from "../../services/actions/ingredientsActions.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";
import ingredientsStyle from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [activeTab, setActiveTab] = useState("bun");

  const checkActiveTab = () => {
    const bunPos = Math.abs(bunRef.current.getBoundingClientRect().top);
    const saucePos = Math.abs(sauceRef.current.getBoundingClientRect().top);
    const mainPos = Math.abs(mainRef.current.getBoundingClientRect().top);

    if (bunPos < saucePos && bunPos < mainPos) {
      setActiveTab("bun");
    } else if (saucePos < bunPos && saucePos < mainPos) {
      setActiveTab("sauce");
    } else {
      setActiveTab("main");
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", checkActiveTab);

    return () => {
      document.removeEventListener("scroll", checkActiveTab);
    };
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const filteredBunIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );

  const filteredSauceIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "sauce"),
    [ingredients]
  );

  const filteredMainIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "main"),
    [ingredients]
  );

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
        <Tab value="bun" onClick={() => {}} active={activeTab === "bun"}>
          Булки
        </Tab>
        <Tab value="sauce" onClick={() => {}} active={activeTab === "sauce"}>
          Соусы
        </Tab>
        <Tab value="main" onClick={() => {}} active={activeTab === "main"}>
          Начинки
        </Tab>
      </div>

      <div
        className={`${ingredientsStyle.scroll} mt-10`}
        onScroll={checkActiveTab}
      >
        {ingredients && (
          <IngredientsBoard
            ref={bunRef}
            title="Булки"
            menu="bun"
            data={filteredBunIngredients}
            onClick={handleSelectIngredient}
          />
        )}
        {ingredients && (
          <IngredientsBoard
            ref={sauceRef}
            title="Соусы"
            menu="sauce"
            data={filteredSauceIngredients}
            onClick={handleSelectIngredient}
          />
        )}
        {ingredients && (
          <IngredientsBoard
            ref={mainRef}
            title="Начинки"
            menu="main"
            data={filteredMainIngredients}
            onClick={handleSelectIngredient}
          />
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;
