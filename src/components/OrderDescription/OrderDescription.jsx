import React, { useEffect, useState } from "react";
import styles from "./OrderDescription.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchOrderDetails } from "../../services/actions/orderDescription";
import { getIngredients } from "../../services/actions/burgerIngredients";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDescription = (props) => {
  const { isModal = false } = props;
  const [isLoading, setIsLoading] = useState(true);

  const orderStatusMapping = {
    done: "Выполнен",
    created: "Создан",
    pending: "Готовится",
  };

  const dispatch = useDispatch();
  const { orderNumber } = useParams();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(fetchOrderDetails(orderNumber)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, orderNumber]);

  const order = useSelector((store) => store.orderDescription?.order || {});
  const allIngredients = useSelector(
    (store) => store.burgerIngredients?.ingredients || []
  );

  const ingredientList = isLoading
    ? []
    : order.ingredients.map((id) =>
        allIngredients.find((ing) => ing._id === id)
      );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={isModal ? styles.orderContainerModal : styles.orderContainer}
    >
      <div className={styles.orderDescriptionContent}>
        <p
          className={`${styles.orderNumber} text text_type_digits-default pb-10`}
        >
          #{orderNumber}
        </p>
        <h2 className="text text_type_main-medium pb-3">{order.name}</h2>
        <p
          className={`${styles.orderStatus} text text_type_main-default pb-15`}
        >
          {orderStatusMapping[order.status] || order.status}
        </p>
        <p className="text text_type_main-medium pb-6">Состав:</p>
        <ul className={`${styles.ingredientsList} custom-scroll`}>
          {ingredientList &&
            ingredientList.map((ingredient, index) => (
              <li key={index} className={styles.ingredient}>
                <div className={styles.ingredientWrapper}>
                  <div className={styles.ingredientBorder}>
                    <img
                      className={styles.ingredientImage}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    />
                  </div>
                  <p
                    className={`${styles.ingredientName} text text_type_main-default pl-4`}
                  >
                    {ingredient.name}
                  </p>
                </div>
                <div className={styles.ingredientPrice}>
                  <p className="text text_type_digits-default pr-2">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDescription;
