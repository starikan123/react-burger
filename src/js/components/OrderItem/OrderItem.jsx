import React from "react";
import { Link } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentOrderDetails } from "../../services/actions/orderItemDetailsActions";

const OrderItem = ({ path, item, linkState }) => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ingredients.ingredients);
  const { name, number, ingredients, createdAt, status } = item;

  const orderIngredientsMap = {};
  ingredients.forEach((ingredient) => {
    const foundIngredient = items.find((item) => item._id === ingredient);
    if (foundIngredient) {
      if (foundIngredient.type === "bun") {
        orderIngredientsMap[ingredient] = {
          ingredient: foundIngredient,
          count: 2,
        };
      } else {
        if (orderIngredientsMap[ingredient]) {
          orderIngredientsMap[ingredient].count += 1;
        } else {
          orderIngredientsMap[ingredient] = {
            ingredient: foundIngredient,
            count: 1,
          };
        }
      }
    }
  });

  const orderIngredients = Object.values(orderIngredientsMap);
  const totalPrice = orderIngredients.reduce(
    (sum, item) => sum + item.ingredient.price * item.count,
    0
  );

  const onItemClick = () => {
    dispatch(setCurrentOrderDetails(item));
  };

  const uniqueOrderIngredients = [...new Set(orderIngredients)].sort((a, b) => {
    if (a.type === "bun") {
      return -1;
    }
    if (b.type === "bun") {
      return 1;
    }
    return 0;
  });

  return (
    uniqueOrderIngredients.length > 0 && (
      <li className={`${styles.orderItem} p-6`}>
        <Link
          to={path}
          className={styles.linkStyle}
          onClick={onItemClick}
          state={linkState}
        >
          <div className={styles.topSection}>
            <span className="text text_type_digits-default">#{number}</span>
            <span className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(createdAt)} />
            </span>
          </div>
          <h3 className="text text_type_main-medium mt-6">{name}</h3>
          <p
            className={`text text_type_main-default mt-2 mb-6 ${
              status === "done" ? styles.statusCompleted : ""
            }`}
          >
            {status === "done"
              ? "Выполнен"
              : status === "created"
              ? "Создан"
              : "Готовится"}
          </p>
          <div className={`${styles.bottomSection} mt-6`}>
            <ul className={styles.ingredientList}>
              {uniqueOrderIngredients.map((item, index) => {
                if (!item.ingredient) {
                  return null;
                }
                if (
                  index > 5 ||
                  (index === uniqueOrderIngredients.length - 1 &&
                    item.ingredient.type === "bun" &&
                    index !== 0)
                ) {
                  return null;
                }
                return (
                  <li
                    key={`${item.ingredient._id}_${index}`}
                    style={{ zIndex: 1000 - index }}
                    className={`${styles.imageWrapper} ${
                      index > 0 ? styles.imageWrapperShifted : ""
                    }`}
                  >
                    <img
                      className={styles.ingredientImage}
                      src={item.ingredient.image_mobile}
                      alt={item.ingredient.name}
                    />
                    {index === 5 && (
                      <span
                        className={`text text_type_digits-default ${styles.overlay}`}
                      >
                        +{uniqueOrderIngredients.length - 5}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <span
              className={`${styles.priceTag} text text_type_digits-default`}
            >
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </Link>
      </li>
    )
  );
};

export default OrderItem;
