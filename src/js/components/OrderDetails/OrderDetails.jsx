import PropTypes from "prop-types";
import done from "../../images/done.png";
import React from "react";

const OrderDetails = ({ orderNumber }) => (
  <>
    <h3 className="text text_type_digits-large pt-30 pb-8">{orderNumber}</h3>
    <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
    <img src={done} alt="картинка успешного заказа" />
    <p className="text text_type_main-small pt-15 pb-2">
      Ваш заказ начали готовить
    </p>
    <p className="text text_type_main-default text_color_inactive pb-30">
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default React.memo(OrderDetails);
