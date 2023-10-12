import { useDispatch, useSelector } from "react-redux";
import OrderItemDetails from "../order-item-details/order-item-details";
import { useEffect } from "react";
import {
  startOrdersHistoryConnection,
  closeOrdersHistoryConnection,
} from "../../services/actions/ordersHistoryActions";
import Loader from "react-js-loader";
import styles from "./order-item-history-details.module.css";

const OrderItemHistoryDetails = () => {
  const orders = useSelector((store) => store.ordersHistory.messages);
  const { accessToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(startOrdersHistoryConnection(accessToken));
    }

    return () => dispatch(closeOrdersHistoryConnection());
  }, [accessToken, dispatch, orders]);

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

export default OrderItemHistoryDetails;
