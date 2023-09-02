import Ingredient from "../Ingredient/Ingredient";
import IngredientsBoardStyle from "./IngredientsBoard.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.jsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIngredientToConstructor } from "../../services/actions/constructorActions";
import { setIngredientForDetails } from "../../services/actions/ingredientsActions";

const IngredientsBoard = React.forwardRef(({ data, title, menu }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const filteredData = React.useMemo(() => {
    return data.filter((item) => item.type === menu);
  }, [data, menu]);

  const handleIngredientClick = (ingredient) => {
    dispatch(setIngredientForDetails(ingredient));
    if (isAuthenticated) {
      dispatch(addIngredientToConstructor(ingredient));
    } else {
      navigate(`/ingredients/${ingredient._id}`);
    }
  };

  return (
    <section ref={ref} className={`${IngredientsBoardStyle.board} pb-10`}>
      <h2 className="text text_type_main-medium m-0 pb-6">{title}</h2>
      <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
        {filteredData.map((item) => (
          <li
            className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6`}
            key={item._id}
          >
            <button
              className={IngredientsBoardStyle.button}
              onClick={() => handleIngredientClick(item)}
            >
              <Ingredient ingredient={item} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
});

IngredientsBoard.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
};

export default IngredientsBoard;
