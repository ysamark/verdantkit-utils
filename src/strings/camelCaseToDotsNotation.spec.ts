import { describe, expect, it } from "vitest";

import {
  camelCaseToDotsNotation,
  camelCaseToUpperDotsNotation,
} from "./camelCaseToDotsNotation";

describe("Test camelCaseToDotsNotation strings util", () => {
  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToDotsNotation(camelCaseString)).toBe(
      "store.service.controller"
    );
  });

  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToUpperDotsNotation(camelCaseString)).toBe(
      "STORE.SERVICE.CONTROLLER"
    );
  });
});
