import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.css";
import doneIconPath from "../../images/done.png";
import loaderIconPath from "../../images/loader.gif";
import { useSelector } from "react-redux";

function OrderDetails() {
  const orderId = useSelector((store) => store.orderDetails.orderId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className="text text_type_main-medium pt-30 pb-3">
          Генерируем идентификатор заказа,
        </h4>
        <p className="text text_type_main-medium pb-15">
          нужно ещё несколько секунд...
        </p>
        <img src={loaderIconPath} className="pb-15" alt="Loading" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h4 className="text text_type_digits-large pt-30 pb-8">{orderId}</h4>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <img src={doneIconPath} className="pb-15" alt="Done" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
