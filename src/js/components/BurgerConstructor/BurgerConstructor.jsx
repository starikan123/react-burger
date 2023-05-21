import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import { BurgerContext } from "../../services/BurgerContext";

function BurgerConstructor({ onClick }) {
  const { selectedIngredients, totalPrice } = React.useContext(BurgerContext);

  const renderBurgerElement = (element, type) => {
    return (
      <div className="ml-8 pl-4 pr-4">
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${element.name} (${type === "top" ? "верх" : "низ"})`}
          price={element.price}
          thumbnail={element.image_mobile}
        />
      </div>
    );
  };

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {selectedIngredients.bun &&
        renderBurgerElement(selectedIngredients.bun, "top")}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {selectedIngredients.other.map((item) => (
          <li className={burgerConstructorsStyle.list} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </li>
        ))}
      </ul>
      {selectedIngredients.bun &&
        renderBurgerElement(selectedIngredients.bun, "bottom")}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onClick} type="primary" size="large">
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
