import { CookieOptions } from "./types";
import { readCookieDate, sanitizeCookieName } from "./utils";

type SetCookieUtil = (
  cookieName: string,
  cookieValue: any,
  options?: CookieOptions
) => void;

export const setCookie: SetCookieUtil = (
  cookieName,
  cookieValue,
  options = {}
) => {
  // 'HOME_PAGE=HeyMan;Max-Age=1718480293524;SameSite=Lax;Path=/home'
  if (options["Max-Age"]) {
    options["Max-Age"] = readCookieDate(options["Max-Age"]);
  }

  cookieName = sanitizeCookieName(cookieName);

  const cookieOptions: Array<string> = [];
  const value =
    typeof cookieValue === "object" && cookieValue
      ? JSON.stringify(cookieValue)
      : String(cookieValue);

  for (const key in options) {
    cookieOptions.push(`${key}=${options[key as keyof typeof options]}`);
  }

  const cookieData = `${cookieName}=${encodeURIComponent(
    value
  )};${cookieOptions.join(";")}`;

  document.cookie = cookieData;
};

export const getCookie = (cookieName: string) => {
  const name = sanitizeCookieName(cookieName) + "=";
  const decodedCookieData = decodeURIComponent(
    (typeof window === "object" && window.document?.cookie) || ""
  );
  const cookieList = decodedCookieData.split(";");

  for (let i = 0; i < cookieList.length; i++) {
    let cookieData = cookieList[i];

    while (cookieData.charAt(0) == " ") {
      cookieData = cookieData.substring(1);
    }

    if (cookieData.indexOf(name) == 0) {
      return cookieData.substring(name.length, cookieData.length);
    }
  }

  return "";
};

export const cookie = {
  set: setCookie,
  get: getCookie,
};

export default cookie;
