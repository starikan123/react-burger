export const baseUrl = "https://norma.nomoreparties.space/api";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((json) => Promise.reject(json.message));
}

export function request(endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}
