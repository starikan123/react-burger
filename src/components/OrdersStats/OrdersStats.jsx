import React, { useMemo } from "react";
import styles from "./OrdersStats.module.css";
import { useSelector } from "react-redux";

function OrderStats() {
  const ordersTotal = useSelector((store) => store.ws.total);
  const ordersToday = useSelector((store) => store.ws.totalToday);
  const orders = useSelector((store) => store.ws.orders);

  const doneOrdersIds = useMemo(() => {
    return orders
      .filter((order) => order.status === "done")
      .map((order) => order.number)
      .slice(0, 10);
  }, [orders]);

  const createdOrderIds = useMemo(() => {
    return orders
      .filter((order) => order.status === "created")
      .map((order) => order.number)
      .slice(0, 10);
  }, [orders]);

  const isError = useMemo(() => {
    return !orders || orders.length === 0;
  }, [orders]);

  return (
    <div className={styles.orderStats}>
      {isError ? (
        <p className="text text_type_main-medium">Error fetching data.</p>
      ) : (
        <>
          <div className={styles.currentOrders}>
            <div className={styles.ready}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <ul
                className={`${styles.list} ${styles.grid} text text_type_digits-default`}
              >
                {doneOrdersIds.map((orderId, index) => (
                  <li key={index} className={styles.readyItem}>
                    {orderId}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.inProgress}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <ul
                className={`${styles.list} ${styles.grid} text text_type_digits-default`}
              >
                {createdOrderIds.map((orderId, index) => (
                  <li key={index} className={styles.inProgressItem}>
                    {orderId}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium pb-6">
              Выполнено за всё время:
            </p>
            <p className={`${styles.shadow} text text_type_digits-large`}>
              {ordersTotal}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium pb-6">
              Выполнено за сегодня:
            </p>
            <p className={`${styles.shadow} text text_type_digits-large`}>
              {ordersToday}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderStats;
