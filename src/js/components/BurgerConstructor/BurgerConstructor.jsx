import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import { placeOrder } from "../../services/actions/orderActions";
import {
  addIngredientToConstructor,
  removeIngredient,
  moveIngredient,
} from "../../services/actions/constructorActions";

function DraggableConstructorElement({
  index,
  moveIngredient,
  ingredient,
  handleRemoveClick,
}) {
  const ref = React.useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "constructorElement",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      ref={ref}
      className={burgerConstructorsStyle.list}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={ingredient.type === "bun"}
        handleClose={
          ingredient.type !== "bun"
            ? () => handleRemoveClick(ingredient._id)
            : undefined
        }
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
      />
    </li>
  );
}

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

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};

DraggableConstructorElement.propTypes = {
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  ingredient: ingredientType.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
};
