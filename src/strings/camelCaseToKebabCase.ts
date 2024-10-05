import { camelCaseToN } from "./camelCaseToN";

export const camelCaseToKebabCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "-");
};

export const camelCaseToUpperKebabCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "-").toUpperCase();
};

export const camelCaseToDashCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "-");
};

export const camelCaseToUpperDashCase = (camelCaseString: string): string => {
  return camelCaseToN(camelCaseString, "-").toUpperCase();
};
