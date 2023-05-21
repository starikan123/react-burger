import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import ingredientType from "../../utils/types";

import { BurgerContext } from "../../services/BurgerContext";

function BurgerConstructor({ onClick }) {
  const { selectedIngredients, totalPrice } = React.useContext(BurgerContext);

  const renderBurgerElement = (ingredient, type) => {
    return (
      <div className="ml-8 pl-4 pr-4">
        <ConstructorElement
          type={type}
          isLocked={type === "bun"}
          text={`${ingredient.name} (${type === "top" ? "верх" : "низ"})`}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
        />
      </div>
    );
  };

  const { bun, other } = selectedIngredients;
  const bunTop = bun || other.find((ingredient) => ingredient.type === "bun");

  const filteredOtherIngredients = other.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {bunTop && renderBurgerElement(bunTop, "top")}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {filteredOtherIngredients.map((ingredient) => (
          <li className={burgerConstructorsStyle.list} key={ingredient._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          </li>
        ))}
      </ul>
      {bunTop && renderBurgerElement(bunTop, "bottom")}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
