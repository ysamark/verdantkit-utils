import { describe, expect, it } from "vitest";

import { getQueryMatchSearchParams } from "./getQueryMatchSearchParams";

describe("Test getQueryMatchSearchParams util", () => {
  it("should read query match search params", () => {
    const params = new URLSearchParams(
      "match.name:equals=Sam&match.email:endsWith=gmail.com&match.slag:contains=a"
    );

    const queryMatchParams = getQueryMatchSearchParams(params);

    expect(queryMatchParams).toMatchObject([
      ["match.name:equals", "Sam", false],
      ["match.email:endsWith", "gmail.com", false],
      ["match.slag:contains", "a", false],
    ]);
  });

  it("should read query match search params with OR statements", () => {
    const params = new URLSearchParams(
      "match.name:equals=Sam&match.email:endsWith=gmail.com&or:match.slag:contains=a&or:match.slag:contains=ab"
    );

    const queryMatchParams = getQueryMatchSearchParams(params);

    const withORStatement = true;
    const withNoORStatement = false;

    expect(queryMatchParams).toMatchObject([
      ["match.name:equals", "Sam", withNoORStatement],
      ["match.email:endsWith", "gmail.com", withNoORStatement],
      ["match.slag:contains", "a", withORStatement],
      ["match.slag:contains", "ab", withORStatement],
    ]);
  });
});
