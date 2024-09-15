export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase().concat(str.slice(1));

export const capitalizeWords = (str: string): string =>
  str
    .split(/\s/)
    .map((word) => capitalize(word))
    .join(" ");

export const noEmpty = (data: unknown): data is string => {
  return typeof data === "string" && /\S/.test(data);
};

export const empty = (data: unknown): boolean => !noEmpty(data);

export { capitalizeWords as ucWords, capitalize as usFirst };
