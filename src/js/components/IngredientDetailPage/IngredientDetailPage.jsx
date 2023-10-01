import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIngredientForDetails } from "../../services/actions/ingredientsActions";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const IngredientDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const currentIngredient = useSelector(
    (state) => state.ingredients.currentIngredient
  );

  useEffect(() => {
    if (ingredients) {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        dispatch(setIngredientForDetails(ingredient));
      } else {
        console.error("Ingredient not found");
      }
    }
  }, [id, dispatch, ingredients]);

  if (!currentIngredient || location.state?.background) return null;

  return <IngredientDetails />;
};

export default IngredientDetailPage;
