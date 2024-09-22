import { capitalize } from "..";

export const camelCaseToPascalCase = (camelCaseString: string): string => {
  return capitalize(camelCaseString);
};
