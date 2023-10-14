import React, { useEffect } from "react";
import styles from "../IngredientDetails/IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredientDetails } from "../../services/actions/ingredientDetails";

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredientDetails = useSelector(
    (store) => store.ingredientDetails.ingredient
  );

  useEffect(() => {
    dispatch(fetchIngredientDetails(id));
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} text text_type_main-large pt-10`}>
        Детали ингредиента
      </h3>
      <img
        src={ingredientDetails?.image_large}
        className={`${styles.image} pb-4`}
        alt={ingredientDetails?.name}
      />
      <h4 className="text text_type_main-medium pb-8">
        {ingredientDetails?.name}
      </h4>
      <ul className={styles.nutritionDataWrapper}>
        <li className={styles.nutritionData}>
          <p
            className={`${styles.nutritionLabel} text text_type_main-default text_color_inactive`}
          >
            Калории, ккал
          </p>
          <p
            className={`${styles.nutritionValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredientDetails?.calories}
          </p>
        </li>
        <li className={styles.nutritionData}>
          <p
            className={`${styles.nutritionLabel} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.nutritionValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredientDetails?.proteins}
          </p>
        </li>
        <li className={styles.nutritionData}>
          <p
            className={`${styles.nutritionLabel} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.nutritionValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredientDetails?.fat}
          </p>
        </li>
        <li className={styles.nutritionData}>
          <p
            className={`${styles.nutritionLabel} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </p>
          <p
            className={`${styles.nutritionValue} text text_type_digits-default text_color_inactive`}
          >
            {ingredientDetails?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
