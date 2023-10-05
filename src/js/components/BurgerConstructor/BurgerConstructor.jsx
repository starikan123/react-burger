import React, { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  clearBurgerConstructor,
} from "../../services/actions/constructorActions";
import DraggableConstructorElement from "../DraggableConstructorElement/DraggableConstructorElement";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";

function BurgerConstructor({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.burger);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      const ingredientWithUniqueId = {
        ...item.ingredient,
        uniqueId: uuidv4(),
      };
      dispatch(addIngredientToConstructor(ingredientWithUniqueId));
    },
  });

  const handleOrderClick = async () => {
    try {
      const ingredientIds = state.selectedIngredients.map((i) => i._id);

      if (!ingredientIds || ingredientIds.length === 0) {
        return;
      }

      if (isAuthenticated) {
        await dispatch(placeOrder(ingredientIds));

        onClick();

        dispatch(clearBurgerConstructor());
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      console.error("Could not create order:", error);
    }
  };

  const handleRemoveClick = (uniqueId) => {
    dispatch(removeIngredient(uniqueId));
  };

  const renderBurgerElement = (ingredient, type, index) => (
    <div
      className="ml-8 pl-4 pr-4"
      key={`${ingredient.uniqueId}-${type}-${index}`}
    >
      <ConstructorElement
        type={type}
        isLocked={ingredient.type === "bun"}
        handleClose={
          ingredient.type !== "bun"
            ? () => handleRemoveClick(ingredient.uniqueId)
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
            key={ingredient.uniqueId}
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
        <Button
          htmlType="button"
          onClick={handleOrderClick}
          type="primary"
          size="large"
          disabled={!state.bun}
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
