import { capitalize } from "..";
import { camelCaseToKebabCase } from "./camelCaseToKebabCase";

export const camelCaseToTrainCase = (camelCaseString: string): string => {
  const kebabCaseString = camelCaseToKebabCase(camelCaseString);

  return kebabCaseString
    .split("-")
    .map((slice) => capitalize(slice))
    .join("-");
};
