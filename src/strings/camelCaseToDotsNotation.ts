import { camelCaseToN } from "./camelCaseToN";

export const camelCaseToDotsNotation = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, ".");
};

export const camelCaseToUpperDotsNotation = (
  camelCaseString: string
): string => {
  return camelCaseToN(camelCaseString, ".").toUpperCase();
};
