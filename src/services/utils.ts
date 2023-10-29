type CookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const { expires, path = "/", domain, secure } = options;
  const cookieParts = [`${name}=${encodeURIComponent(value)}`];

  if (expires) {
    let expiryDate: Date;
    if (typeof expires === "number") {
      expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + expires * 1000);
    } else if (expires instanceof Date) {
      expiryDate = expires;
    } else {
      throw new Error("Invalid expires value");
    }
    cookieParts.push(`expires=${expiryDate.toUTCString()}`);
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

export function deleteCookie(name: string): void {
  setCookie(name, "", { expires: -1 });
}
