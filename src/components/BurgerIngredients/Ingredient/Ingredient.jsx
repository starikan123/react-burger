import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";

const Ingredient = ({ ingredient }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });
  const ingredients = useSelector(
    (store) => store.burgerConstructor.constructorIngredients
  );
  const ingredientCounter = ingredients.filter(
    (item) => item._id === ingredient._id
  ).length;
  const ingredientAddition = ingredientCounter > 0;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <IngredientDetails onClose={handleModalClose} />
        </Modal>
      )}
      <Link
        className={styles.ingredientLink}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
      >
        <li ref={dragRef} key={ingredient._id} className={styles.ingredient}>
          <div className={styles.imageContainer}>
            {" "}
            {ingredientAddition && (
              <Counter count={ingredientCounter} size="small" />
            )}
            <img src={ingredient.image} alt={ingredient.name} />
          </div>
          <div className={`${styles.ingredientPrice} pt-1 pb-1`}>
            {" "}
            <p className="text text_type_digits-default pr-2">
              {ingredient.price}
            </p>
            <CurrencyIcon type={"primary"} />
          </div>
          <div
            className={`${styles.ingredientName} text text_type_main-default`}
          >
            {ingredient.name}
          </div>
        </li>
      </Link>
    </>
  );
};

export default Ingredient;
