import ingredientStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient }) => {
  const { name, calories, proteins, fat, image_large, carbohydrates } =
    ingredient;

  return (
    <>
      <h3
        className={`${ingredientStyle.title} text text_type_main-large pt-10`}
      >
        Детали ингредиента
      </h3>
      <img className={ingredientStyle.img} alt={name} src={image_large} />
      <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
      <ul className={`${ingredientStyle.table} pb-15`}>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default">{calories}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default">{proteins}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default">{fat}</p>
        </li>
        <li className={ingredientStyle.list}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default">{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
};

export default IngredientDetails;
