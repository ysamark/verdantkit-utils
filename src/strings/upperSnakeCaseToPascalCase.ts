import { capitalize } from ".";
import { upperSnakeCaseToCamelCase } from "./upperSnakeCaseToCamelCase";

export const upperSnakeCaseToPascalCase = (str: string): string => {
  return capitalize(upperSnakeCaseToCamelCase(str));
};
