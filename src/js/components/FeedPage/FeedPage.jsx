import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../OrderItem/OrderItem";
import {
  startFeedConnection,
  closeFeedConnection,
} from "../../services/actions/feedActions";
import styles from "./FeedPage.module.css";
import { useLocation } from "react-router-dom";

const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Router Location:", location);
  const orders = useSelector((store) => store.feed.messages);
  console.log("Orders from Redux:", orders);
  const data = orders?.length > 0 ? orders[orders.length - 1].orders : null;
  console.log("Processed Data:", data);

  const linkState = { backgroundFeedLocation: location };

  useEffect(() => {
    console.log("Component Mounted / Effect Triggered");
    dispatch(startFeedConnection());
    return () => {
      console.log("Component Unmounting");
      dispatch(closeFeedConnection());
    };
  }, [dispatch]);

  const readyOrders = data
    ? data.filter((item) => item.status === "done").slice(0, 10)
    : [];
  console.log("Ready Orders:", readyOrders);
  const inWorkOrders = data
    ? data.filter((item) => item.status === "pending").slice(0, 10)
    : [];
  console.log("In Work Orders:", inWorkOrders);

  return (
    orders?.length > 0 && (
      <>
        <h1 className={styles.title}>Orders Feed</h1>
        <div className={styles["feed-page"]}>
          <ul className={styles["orders-list"]}>
            {data &&
              data.map((item) => {
                return (
                  <OrderItem
                    key={item._id}
                    path={`/feed/${item._id}`}
                    item={item}
                    linkState={linkState}
                  />
                );
              })}
          </ul>
          <div className={styles["orders-stats"]}>
            <div className={styles["orders-ready"]}>
              <p>Ready:</p>
              <ul>
                {readyOrders.map((order) => (
                  <li key={order.number}>{order.number}</li>
                ))}
              </ul>
            </div>
            <div className={styles["orders-in-work"]}>
              <p>In Work:</p>
              <ul>
                {inWorkOrders.map((order) => (
                  <li key={order.number}>{order.number}</li>
                ))}
              </ul>
            </div>
            <div className={styles["orders-count"]}>
              <p>Total Orders:</p>
              <span>{orders[0].total}</span>
            </div>
            <div className={styles["orders-today"]}>
              <p>Orders Today:</p>
              <span>{orders[0].totalToday}</span>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default FeedPage;
