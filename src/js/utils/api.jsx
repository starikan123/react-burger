export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Error ${res.status}`);
    }
  }

  handleError(err) {
    console.error(err);
  }

  async request(url, options) {
    const res = await fetch(url, options);
    return this.checkResponse(res);
  }

  async getIngredients() {
    try {
      const response = await this.request(`${this.baseUrl}/ingredients`);
      const ingredients = response.data.map((ingredient) => ({
        ...ingredient,
      }));
      return ingredients;
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  async createOrder(ingredientIds) {
    try {
      const order = await this.request(`${this.baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      return order;
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }
}
