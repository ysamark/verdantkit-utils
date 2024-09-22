import { describe, expect, it } from "vitest";

import { upperSnakeCaseToCamelCase } from "./upperSnakeCaseToCamelCase";

describe("Test upperSnakeCaseToCamelCase util", () => {
  it("should convert a given uppercase string to camel case", () => {
    expect(upperSnakeCaseToCamelCase("LOCAL_STORAGE_LIST_ITEM")).toBe(
      "localStorageListItem"
    );
    expect(upperSnakeCaseToCamelCase("SESSION_STORAGE_MyAwesome_DATA")).toBe(
      "sessionStorageMyAwesomeData"
    );
  });
});
