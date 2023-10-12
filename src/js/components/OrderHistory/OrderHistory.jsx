import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./OrderHistory.module.css";
import {
  startOrdersHistoryConnection,
  closeOrdersHistoryConnection,
} from "../../services/actions/ordersHistoryActions";

const OrdersHistory = () => {
  const { accessToken } = useSelector((store) => store.auth);
  const orders = useSelector((store) => store.ordersHistory.messages);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (accessToken) {
      dispatch(startOrdersHistoryConnection(accessToken));

      return () => {
        dispatch(closeOrdersHistoryConnection());
      };
    }
  }, [dispatch, accessToken]);

  const data = orders?.[orders.length - 1]?.orders || [];
  const reversedData = [...data].reverse();
  console.log(orders);

  return (
    reversedData.length > 0 && (
      <>
        <ul className={styles.list}>
          {reversedData.map((item) => (
            <OrderItem
              path={`/profile/orders/${item._id}`}
              key={item._id}
              item={item}
              linkState={{ backgroundOrdersHistoryLocation: location }}
            />
          ))}
        </ul>
      </>
    )
  );
};

export default OrdersHistory;
