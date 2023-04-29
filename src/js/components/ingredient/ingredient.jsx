import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types.jsx";
import ingridientStyle from "./ingredient.module.css";

const Ingredient = ({ ingredient }) => {
  const { name, price, image } = ingredient;

  return (
    <div>
      <img className={ingridientStyle.picture} src={image} alt={name} />
      <div className="mt-1 mb-1">
        <span className={`text text_type_digits-default mr-2`}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingridientStyle.text} text text_type_main-default`}>
        {name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;
