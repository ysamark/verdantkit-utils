import { describe, expect, it } from "vitest";

import {
  camelCaseToDashCase,
  camelCaseToKebabCase,
  camelCaseToUpperDashCase,
  camelCaseToUpperKebabCase,
} from "./camelCaseToKebabCase";

describe("Test camelCaseToKebabCase strings util", () => {
  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToKebabCase(camelCaseString)).toBe(
      "store-service-controller"
    );
  });

  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToUpperKebabCase(camelCaseString)).toBe(
      "STORE-SERVICE-CONTROLLER"
    );
  });

  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToDashCase(camelCaseString)).toBe(
      "store-service-controller"
    );
  });

  it("should convert a given camel case string to snake case", () => {
    const camelCaseString = "storeServiceController";

    expect(camelCaseToUpperDashCase(camelCaseString)).toBe(
      "STORE-SERVICE-CONTROLLER"
    );
  });
});
