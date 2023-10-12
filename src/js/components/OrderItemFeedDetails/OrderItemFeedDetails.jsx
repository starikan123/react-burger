import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItemDetails from "../order-item-details/order-item-details";
import Loader from "react-js-loader";
import styles from "./OrderItemFeedDetails.module.css";
import {
  startFeedConnection,
  closeFeedConnection,
} from "../../services/actions/feedActions";

const OrderItemFeedDetails = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.messages);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(startFeedConnection());
    }

    return () => {
      dispatch(closeFeedConnection());
    };
  }, [dispatch, orders]);

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.loader}>
        <Loader />
        <p className="text text_type_main-default">
          Загрузка... Пожалуйста, подождите
        </p>
      </div>
    );
  }

  const orderDetails = orders.length > 0 ? orders[orders.length - 1] : null;

  return <>{orderDetails && <OrderItemDetails order={orderDetails} />}</>;
};

export default OrderItemFeedDetails;
