import React from "react";
import OrderStats from "../../components/OrdersStats/OrdersStats";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import styles from "./feed.module.css";

const Feed = () => {
  return (
    <div className={styles.feedSection}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.feedContent}>
        <OrderFeed
          feedPersonal={false}
          wsUrl="wss://norma.nomoreparties.space/orders/all"
        />
        <OrderStats />
      </div>
    </div>
  );
};

export default Feed;
