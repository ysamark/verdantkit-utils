import { capitalize, unCapitalize } from "..";

export const upperSnakeCaseToCamelCase = (upperCaseString: string) => {
  const underlineRe = /([_]+)/g;

  const upperCaseStringSlices = upperCaseString
    .split(underlineRe)
    .filter((slice) => !underlineRe.test(slice));

  const capitalizedUpperCaseStringSlices = upperCaseStringSlices.map(
    (slice) => {
      const upperCaseRe = /^([A-Z]+)$/;

      if (upperCaseRe.test(slice)) {
        return capitalize(slice.toLowerCase());
      }

      return capitalize(slice);
    }
  );

  const rewrittenUpperCaseString = capitalizedUpperCaseStringSlices.join("");

  return unCapitalize(rewrittenUpperCaseString);
};
