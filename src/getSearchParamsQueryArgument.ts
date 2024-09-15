import deepmerge from "deepmerge";

import { getQueryMatchSearchParams, noEmpty } from ".";

type SearchParamsQueryArgument = { where: object };

export const getSearchParamsQueryArgument = (
  queryString: URLSearchParams
): SearchParamsQueryArgument => {
  const queryArguments = {} as SearchParamsQueryArgument;

  const validFunctionNames = ["contains", "endsWith", "startsWith", "equals"];

  const queryLimit = queryString.get("limit");
  const queryMatchSearchParams = getQueryMatchSearchParams(queryString); // queryString.get('query')

  if (noEmpty(queryLimit)) {
    const queryLimitSlices = queryLimit.split(/\s*,\s*/);

    const [skip, take] =
      queryLimitSlices.length >= 2
        ? queryLimitSlices.map((slice) => parseInt(slice))
        : [0, parseInt(queryLimitSlices[0])];

    Object.assign(queryArguments, { skip, take });
  }

  let whereStatement = {};

  for (const queryMatchSearchParam of queryMatchSearchParams) {
    const [queryMatch, queryMatchValue, isOr] = queryMatchSearchParam;

    if (noEmpty(queryMatch) && noEmpty(queryMatchValue)) {
      const queryMatchSplittersRe = /(\.|:)/;

      const queryMatchStrSlices = queryMatch
        .split(queryMatchSplittersRe)
        .filter((slice) => !queryMatchSplittersRe.test(slice));

      const [, fieldName, functionName] = queryMatchStrSlices.concat([
        "id",
        "equals",
      ]);

      if (validFunctionNames.includes(functionName)) {
        const statement = isOr
          ? {
              OR: [
                {
                  [fieldName]: {
                    [functionName]: queryMatchValue,
                  },
                },
              ],
            }
          : {
              [fieldName]: {
                [functionName]: queryMatchValue,
              },
            };

        whereStatement = deepmerge(whereStatement, statement);
      }
    }
  }

  return deepmerge<SearchParamsQueryArgument>(queryArguments, {
    where: whereStatement,
  });
};
