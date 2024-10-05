export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase().concat(str.slice(1));

export const unCapitalize = (str: string): string =>
  str.charAt(0).toLowerCase().concat(str.slice(1));

export const capitalizeWords = (str: string): string =>
  str
    .split(/\s/)
    .map((word) => capitalize(word))
    .join(" ");

export const unCapitalizeWords = (str: string): string =>
  str
    .split(/\s/)
    .map((word) => unCapitalize(word))
    .join(" ");

export const noEmpty = (data: unknown): data is string => {
  return typeof data === "string" && /\S/.test(data);
};

export const empty = (data: unknown): boolean => !noEmpty(data);

export {
  unCapitalize as lcFirst,
  unCapitalizeWords as lcWords,
  capitalize as ucFirst,
  capitalizeWords as ucWords,
};

export * from "./camelCaseToDotsNotation";
export * from "./camelCaseToN";
export * from "./camelCaseToPascalCase";
export * from "./camelCaseToSnakeCase";
export * from "./regReplaceCallback";
export * from "./strReplaceCallBack";
export * from "./subStrReplace";
export * from "./upperSnakeCaseToCamelCase";
export * from "./upperSnakeCaseToPascalCase";
