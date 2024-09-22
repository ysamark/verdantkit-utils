import { Nullish, ValueOf } from "~/types";

const separators = ["-", "_", ".", "/", "&", "+", "$"] as const;

export const camelCaseToN = (
  string: string,
  separator?: Nullish<ValueOf<typeof separators>>
): string => {
  if (!(separator && separators.indexOf(separator) >= 0)) {
    separator = "_";
  }

  const matchAll = (stringContent: string, re: RegExp) => {
    const matches = [];

    while (re.test(stringContent)) {
      const strMatch = stringContent.match(re);

      matches.push(String(strMatch && strMatch[0]));

      stringContent = stringContent.replace(re, "");
    }

    return matches;
  };

  const separatorAtTheBeginningRe = new RegExp(`^(\\${separator})+`);
  const separatorAtTheEndRe = new RegExp(`(\\${separator})+$`);
  const moreThanOneSeparatorsRe = new RegExp(`(\\${separator}){2,}`);

  const sanitizeStr = (stringContent: string): string =>
    stringContent
      .toLocaleLowerCase()
      .replace(separatorAtTheBeginningRe, "")
      .replace(separatorAtTheEndRe, "")
      .split(moreThanOneSeparatorsRe)
      .filter((slice) => !moreThanOneSeparatorsRe.test(slice))
      .join("");

  if (typeof string !== "string") {
    throw new TypeError("first argument must be a string");
  }

  const camelRe = /[A-Z]/;

  const stringCapitalLetters = matchAll(string, camelRe);

  const stringSlices = string
    .split(camelRe)
    .map((stringSlice, stringSliceIndex) => {
      return (
        stringSlice +
        ((stringCapitalLetters[stringSliceIndex] &&
          separator + stringCapitalLetters[stringSliceIndex]) ||
          "")
      );
    });

  return sanitizeStr(stringSlices.join(""));
};
