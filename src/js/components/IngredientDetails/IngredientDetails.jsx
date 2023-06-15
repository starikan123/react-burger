import React from "react";
import ingredientStyle from "./IngredientDetails.module.css";
import ingredientType from "../../utils/types.jsx";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const currentIngredient = useSelector(
    (state) => state.burger.currentIngredient
  );

  const { name, calories, proteins, fats, carbohydrates, image } =
    currentIngredient;

  return (
    <>
      <h3
        className={`${ingredientStyle.title} text text_type_main-large pt-10`}
      >
        Детали ингредиента
      </h3>
      <img className={ingredientStyle.img} alt={name} src={image} />
      <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
      <ul className={`${ingredientStyle.table} pb-15`}>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default">{calories}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default">{proteins}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default">{fats}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default">{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientDetails;
