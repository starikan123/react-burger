import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeIngredientFromConstructor,
  reorderIngredient,
} from "../../../services/actions/burgerConstructor";
import { useDrag, useDrop } from "react-dnd";
import styles from "../BurgerConstructor.module.css";

function DraggableIngredient({ ingredient }) {
  const [newIndex, setNewIndex] = useState(null);
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(
    (store) => store.burgerConstructor.constructorIngredients
  );
  const index = constructorIngredients.findIndex(
    (ing) => ing.uniqueId === ingredient.uniqueId
  );

  const removeIconRef = useRef(null);

  const [, drag] = useDrag({
    type: "ingredient",
    item: { type: "ingredient", index },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      setNewIndex(index);
    },
    drop: (item, monitor) => {
      if (newIndex !== null) {
        dispatch(reorderIngredient(item.index, newIndex));
      }
    },
  });

  drag(dropTarget(removeIconRef));

  useEffect(() => {
    const handleRemoveClick = (event) => {
      const uniqueId =
        event.target.closest("[data-unique-id]").dataset.uniqueId;
      dispatch(removeIngredientFromConstructor(uniqueId));
    };

    const wrapper = removeIconRef.current;
    const removeIcon =
      wrapper && wrapper.querySelector(".constructor-element__action");
    if (removeIcon) {
      removeIcon.addEventListener("click", handleRemoveClick);
    }
  }, [constructorIngredients, dispatch]);

  return (
    <li
      ref={removeIconRef}
      className={`${styles.ingredientItem} removable-ingredient pt-2 pr-2 pb-2 pl-4`}
      key={ingredient.uniqueId}
      data-unique-id={ingredient.uniqueId}
    >
      <div className="pr-2">
        <DragIcon type={"primary"} />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
}

export default DraggableIngredient;
