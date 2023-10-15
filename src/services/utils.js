export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name,
  value,
  { expires, path = "/", domain, secure } = {}
) {
  const cookieParts = [`${name}=${encodeURIComponent(value)}`];

  if (expires) {
    if (typeof expires === "number") {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = d;
    }

    if (expires instanceof Date) {
      cookieParts.push(`expires=${expires.toUTCString()}`);
    }
  }

  if (path) {
    cookieParts.push(`path=${path}`);
  }

  if (domain) {
    cookieParts.push(`domain=${domain}`);
  }

  if (secure) {
    cookieParts.push("secure");
  }

  document.cookie = cookieParts.join("; ");
}

export function deleteCookie(name) {
  setCookie(name, "", { expires: -1 });
}
