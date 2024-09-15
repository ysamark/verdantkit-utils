import { CookieDate } from "./types";

export const sanitizeCookieName = (cookieName: string): string => {
  const cookieNamePrefix = "__APP-data-";
  const cookieNamePrefixRe = new RegExp(`^(${cookieNamePrefix})`);

  return cookieNamePrefix.concat(cookieName.replace(cookieNamePrefixRe, ""));
};

export const readCookieDate = (cookieDate: CookieDate): number => {
  if (typeof cookieDate === "number") {
    return cookieDate;
  }

  if (cookieDate instanceof Date) {
    return cookieDate.getTime();
  }

  const cookieMaxAgeValueRe = /^([0-9]+([hmsdMy]))$/;

  const cookieMaxAgeValueReMatch = cookieMaxAgeValueRe.exec(cookieDate);

  const currentDate = new Date(Date.now());

  if (cookieMaxAgeValueReMatch) {
    const cookieMaxAgeValue = parseInt(cookieDate);
    const [cookieMaxAgeValueUnity] = cookieMaxAgeValueReMatch.slice(2);

    switch (cookieMaxAgeValueUnity) {
      case "h":
        currentDate.setHours(currentDate.getHours() + cookieMaxAgeValue);
        break;
      case "m":
        currentDate.setMinutes(currentDate.getMinutes() + cookieMaxAgeValue);
        break;
      case "s":
        currentDate.setSeconds(currentDate.getSeconds() + cookieMaxAgeValue);
        break;
      case "d":
        currentDate.setDate(currentDate.getDate() + cookieMaxAgeValue);
        break;
      case "M":
        currentDate.setMonth(currentDate.getMonth() + cookieMaxAgeValue);
        break;
      case "y":
        currentDate.setFullYear(currentDate.getFullYear() + cookieMaxAgeValue);
        break;
    }
  }

  return currentDate.getTime();
};
