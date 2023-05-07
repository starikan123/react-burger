export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  handleError(err) {
    console.error(err);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  async getIngredients() {
    try {
      const ingredients = await this._request(
        `${this._baseUrl}/ingredients`,
        null
      );
      return ingredients;
    } catch (err) {
      this.handleError(err);
      return Promise.reject(err);
    }
  }
}
