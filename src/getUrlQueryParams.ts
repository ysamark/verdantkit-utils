export const getUrlQueryParams = <QueryParamsMap = object>(
  url: string | URL
): QueryParamsMap => {
  if (url instanceof URL) {
    const queryParams: QueryParamsMap = {} as QueryParamsMap;

    url.searchParams.forEach((value, key) => {
      queryParams[key as keyof QueryParamsMap] =
        value as QueryParamsMap[keyof QueryParamsMap];
    });

    return queryParams;
  }

  try {
    const urlDataObject = new URL(url);

    return getUrlQueryParams(urlDataObject);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    const queryParams: QueryParamsMap = {} as QueryParamsMap;
    const andRe = /(\s*&\s*)/;
    const equalsRe = /(\s*=\s*)/;
    const queryParamsRe = /\?([^#]+)$/;
    const queryParamsMatch = queryParamsRe.exec(url);

    if (queryParamsMatch) {
      const [queryParamsList] = queryParamsMatch.slice(1);
      const queryParamsListKeyValuePairs = queryParamsList
        .split(andRe)
        .filter((slice) => !andRe.test(slice));

      queryParamsListKeyValuePairs.forEach((queryParamsListKeyValuePair) => {
        const [key, value] = queryParamsListKeyValuePair
          .split(equalsRe)
          .filter((slice) => !equalsRe.test(slice));

        queryParams[key as keyof QueryParamsMap] =
          value as QueryParamsMap[keyof QueryParamsMap];
      });
    }

    return queryParams;
  }
};
