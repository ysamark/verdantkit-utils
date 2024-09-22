import { camelCaseToN } from "./camelCaseToN";

export const camelCaseToSnakeCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "_");
};

export const camelCaseToUpperSnakeCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "_").toUpperCase();
};
