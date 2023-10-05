import { request } from "./apiUtils";

const api = {
  getIngredients: async () => {
    try {
      const response = await request(`/ingredients`);
      const ingredients = response.data.map((ingredient) => ({
        ...ingredient,
      }));
      return ingredients;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  createOrder: async (ingredientIds) => {
    try {
      const order = await request(`/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      return order;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default api;
