import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import ingredientType from "../../utils/types.jsx";

const BurgerConstructor = ({ ingredientslist, menu, onClick }) => {
  const filteredIngredients = useMemo(
    () =>
      ingredientslist
        .filter((item) => item.type !== menu)
        .map((item) => (
          <li className={burgerConstructorsStyle.list} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </li>
        )),
    [ingredientslist, menu]
  );

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
      {ingredientslist[0] && renderBurgerElement(ingredientslist[0], "top")}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {filteredIngredients}
      </ul>
      {ingredientslist[0] && renderBurgerElement(ingredientslist[0], "bottom")}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">167890</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientslist: PropTypes.arrayOf(ingredientType).isRequired,
  menu: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
