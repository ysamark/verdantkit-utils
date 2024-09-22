import { describe, expect, it } from "vitest";

import { upperSnakeCaseToPascalCase } from "./upperSnakeCaseToPascalCase";

describe("Test upperSnakeCaseToPascalCase util", () => {
  it("should convert a given uppercase string to camel case", () => {
    expect(upperSnakeCaseToPascalCase("LOCAL_STORAGE_LIST_ITEM")).toBe(
      "LocalStorageListItem"
    );
    expect(upperSnakeCaseToPascalCase("SESSION_STORAGE_MyAwesome_DATA")).toBe(
      "SessionStorageMyAwesomeData"
    );
  });
});
