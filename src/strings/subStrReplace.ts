import { Nullable } from "../types";

export const subStrReplace = (
  string: string,
  start: number,
  end: number,
  replaceData: Nullable<string> = null
): string => {
  replaceData = String(replaceData);

  if (!(typeof string === "string")) {
    throw new TypeError("first argument must be a string");
  }

  const newStringContent = [
    string.slice(0, start),
    replaceData,
    string.slice(end, string.length),
  ];

  return newStringContent.join("");
};
