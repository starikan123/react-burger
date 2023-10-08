import Cookies from "universal-cookie";

const cookies = new Cookies();

export function setCookie(name, value, days) {
  cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  });
}

export function getCookie(name) {
  return cookies.get(name);
}

export function deleteCookie(name) {
  cookies.remove(name, { path: "/" });
}
