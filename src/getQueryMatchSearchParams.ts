import { noEmpty } from ".";

export const getQueryMatchSearchParams = (params: URLSearchParams) => {
  const queryParams = Array.from(params.entries());

  const matchSearchParams: Array<[string, string, boolean]> = [];

  queryParams.forEach((matchSearchParam) => {
    const [query] = matchSearchParam;

    const matchRe = /^(((or)(\.|:))?match)/i;
    const matchReMatch = matchRe.exec(query);

    if (matchReMatch) {
      const [matchFunctionName, ...rest] = [
        ...matchSearchParam,
        noEmpty(matchReMatch[3]),
      ];

      matchSearchParams.push([
        matchFunctionName.replace(/^or(\.|:)/i, ""),
        ...rest,
      ]);
    }
  });

  return matchSearchParams;
};
