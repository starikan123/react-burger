import React from "react";
import { useSelector } from "react-redux";
import done from "../../images/done.png";

const OrderDetails = () => {
  const orderNumber = useSelector((state) => state.order.orderNumber);

  return (
    <div>
      <h3 className="text text_type_digits-large pt-30 pb-8">{orderNumber}</h3>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <img src={done} alt="картинка успешного заказа" />
      <p className="text text_type_main-small pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;