import { URLSearchParams } from "node:url";

import { describe, expect, it } from "vitest";

import { getSearchParamsQueryArgument } from "./getSearchParamsQueryArgument";

describe("Test getSearchParamsQueryArgument util", () => {
  it("should read a list of search params query argument", () => {
    const params = new URLSearchParams(
      "match.email:endsWith=gmail.com&match.slag:contains=a"
    );

    const queryArguments = getSearchParamsQueryArgument(params);

    expect(queryArguments).toMatchObject({
      where: {
        email: {
          endsWith: "gmail.com",
        },
        slag: {
          contains: "a",
        },
      },
    });
  });

  it("should read a list of search params query argument with OR statements", () => {
    const params = new URLSearchParams(
      "match.email:endsWith=gmail.com&or:match.slag:contains=a&or:match.slag:contains=ab"
    );

    const queryArguments = getSearchParamsQueryArgument(params);

    expect(queryArguments).toMatchObject({
      where: {
        email: {
          endsWith: "gmail.com",
        },
        OR: [
          {
            slag: {
              contains: "a",
            },
          },
          {
            slag: {
              contains: "ab",
            },
          },
        ],
      },
    });
  });
});
