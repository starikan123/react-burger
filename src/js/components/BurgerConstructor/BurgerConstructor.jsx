import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { placeOrder } from "../../services/actions/orderActions";
import {
  addIngredientToConstructor,
  removeIngredient,
  moveIngredient,
} from "../../services/actions/constructorActions";
import DraggableConstructorElement from "../DraggableConstructorElement/DraggableConstructorElement";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";

function BurgerConstructor({ onClick }) {
  console.log("Rendering BurgerConstructor");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.burger);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      console.log("Dropped item", item);
      console.log("Dispatching: addIngredientToConstructor", item.ingredient);
      dispatch(addIngredientToConstructor(item.ingredient));
    },
  });

  const handleOrderClick = async () => {
    try {
      const ingredientIds = state.selectedIngredients.map((i) => i._id);
      console.log("Dispatching: placeOrder", ingredientIds);
      dispatch(placeOrder(ingredientIds));
      onClick();
    } catch (error) {
      console.error("Could not create order:", error);
    }
  };

  const handleRemoveClick = (ingredientId) => {
    console.log("Dispatching: removeIngredient", ingredientId);
    dispatch(removeIngredient(ingredientId));
  };

  const renderBurgerElement = (ingredient, type, index) => (
    <div className="ml-8 pl-4 pr-4" key={`${ingredient._id}-${type}-${index}`}>
      <ConstructorElement
        type={type}
        isLocked={ingredient.type === "bun"}
        handleClose={
          ingredient.type !== "bun"
            ? () => handleRemoveClick(ingredient._id)
            : undefined
        }
        text={`${ingredient.name} (${type === "top" ? "верх" : "низ"})`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
      />
    </div>
  );

  const totalPrice = useMemo(() => {
    const bunPrice = state.bun ? state.bun.price : 0;
    const ingredientsPrice = state.selectedIngredients.reduce(
      (acc, cur) => acc + cur.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [state.selectedIngredients, state.bun]);

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`} ref={dropRef}>
      {state.bun && renderBurgerElement(state.bun, "top", 0)}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {state.selectedIngredients.map((ingredient, index) => (
          <DraggableConstructorElement
            key={`${ingredient._id}-${index}`}
            index={index}
            moveIngredient={(dragIndex, hoverIndex) =>
              dispatch(moveIngredient(dragIndex, hoverIndex))
            }
            ingredient={ingredient}
            handleRemoveClick={handleRemoveClick}
          />
        ))}
      </ul>
      {state.bun && renderBurgerElement(state.bun, "bottom", 0)}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleOrderClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerConstructor;
