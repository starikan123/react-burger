import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../services/actions/actions";

function BurgerConstructor({ onClick }) {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (state) => state.burger.selectedIngredients
  );
  const order = useSelector((state) => state.burger.order);
  const totalPrice = useSelector((state) => state.burger.totalPrice);

  const handleOrderClick = async () => {
    try {
      const ingredientIds = selectedIngredients.map((i) => i._id);
      dispatch(placeOrder(ingredientIds));
      onClick();
    } catch (error) {
      console.error("Could not create order:", error);
    }
  };

  const renderBurgerElement = (ingredient, type, index) => {
    return (
      <div
        className="ml-8 pl-4 pr-4"
        key={`${ingredient._id}-${type}-${index}`}
      >
        <ConstructorElement
          type={type}
          isLocked={ingredient.type === "bun"}
          text={`${ingredient.name} (${type === "top" ? "верх" : "низ"})`}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
        />
      </div>
    );
  };

  const bun = useMemo(() => {
    const bunIngredient = selectedIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );
    return bunIngredient || null;
  }, [selectedIngredients]);

  const otherIngredients = useMemo(() => {
    return selectedIngredients.filter(
      (ingredient) => ingredient.type !== "bun"
    );
  }, [selectedIngredients]);

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {bun && renderBurgerElement(bun, "top")}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {otherIngredients.map((ingredient, index) => (
          <li
            className={burgerConstructorsStyle.list}
            key={`${ingredient._id}-${index}`}
          >
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
      {bun && renderBurgerElement(bun, "bottom")}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOrderClick}
          htmlType="button"
          type="primary"
          size="large"
        >
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
