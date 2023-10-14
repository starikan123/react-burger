import React, { useEffect, useMemo } from "react";
import styles from "./OrderFeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function OrderFeed({ feedPersonal, wsUrl }) {
  const className = feedPersonal ? styles.feedPersonal : styles.feedGeneral;
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.orders);
  const sortedOrders = feedPersonal ? [...orders].reverse() : orders;
  const allIngredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START", payload: { wsUrl } });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED" });
    };
  }, [dispatch, wsUrl]);

  const renderOrderCards = () => {
    return sortedOrders.map((order, index) => {
      const ingredients = order.ingredients.map((ingredientId) => {
        const ingredientData = allIngredients.find(
          (ingredient) => ingredient._id === ingredientId
        );
        return ingredientData || null;
      });

      const totalPrice = ingredients.reduce((total, ingredient) => {
        return total + (ingredient ? ingredient.price : 0);
      }, 0);

      const extraIngredients =
        ingredients.length > 6 ? ingredients.length - 6 : 0;

      return (
        <Link
          key={index}
          className={styles.orderLink}
          state={{ background: location }}
          to={
            feedPersonal
              ? `/profile/orders/${order.number}`
              : `/feed/${order.number}`
          }
        >
          <div className={styles.orderCard}>
            <div className={styles.orderDetails}>
              <div className={styles.orderTechDetails}>
                <p className={styles.orderNumber}>{order.number}</p>
                <p className={styles.orderDate}>
                  <FormattedDate date={new Date(order.createdAt)} />
                </p>
              </div>
              <p className={styles.orderName}>{order.name}</p>
              <div className={styles.orderVisualization}>
                <div className={styles.orderIngredients}>
                  <ul className={styles.ingredientsList}>
                    {ingredients.slice(0, 6).map((ingredient, index) => (
                      <li
                        key={index}
                        className={styles.ingredientBorder}
                        style={{ zIndex: 6 - index }}
                      >
                        {ingredient && (
                          <img
                            className={styles.ingredient}
                            src={ingredient.image_mobile}
                            alt={ingredient.name}
                          />
                        )}
                      </li>
                    ))}
                    {extraIngredients > 0 && (
                      <li
                        className={`${styles.ingredientBorderDarkened} ${styles.ingredientsExtraText}`}
                      >
                        <p className={styles.ingredientsExtra}>
                          +{extraIngredients}
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className={styles.orderCost}>
                  <p className={styles.orderTotalPrice}>{totalPrice}</p>
                  <CurrencyIcon type={"primary"} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className={`${className} ${styles.customScroll}`}>
      {renderOrderCards()}
    </div>
  );
}

export default React.memo(OrderFeed);
