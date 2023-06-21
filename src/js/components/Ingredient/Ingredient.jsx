import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types.jsx";
import ingridientStyle from "./Ingredient.module.css";
import { useDispatch } from "react-redux";
import { setCurrentIngredient } from "../../services/actions/ingredientsActions.js";

import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleIngredientClick = () => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const priceDisplay = React.useMemo(() => {
    return (
      <div className="mt-1 mb-1">
        <span className={`text text_type_digits-default mr-2`}>
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    );
  }, [ingredient.price]);

  return (
    <div
      onClick={handleIngredientClick}
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        className={ingridientStyle.picture}
        src={ingredient.image}
        alt={ingredient.name}
      />
      {priceDisplay}
      <p className={`${ingridientStyle.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;