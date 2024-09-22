import { describe, expect, it } from "vitest";

import {
  camelCaseToSnakeCase,
  camelCaseToUpperSnakeCase,
} from "./camelCaseToSnakeCase";

describe("Test camelCaseToSnakeCase strings util", () => {
  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToSnakeCase(camelCaseString)).toBe(
      "store_service_controller"
    );
  });

  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToUpperSnakeCase(camelCaseString)).toBe(
      "STORE_SERVICE_CONTROLLER"
    );
  });
});
