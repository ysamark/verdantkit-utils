import { describe, expect, it } from "vitest";

import { fakeStr } from "~/tests/utils";

import { camelCaseToN } from "./camelCaseToN";

describe("Test camelCaseToN strings util", () => {
  it("should convert a given camel case string to dots notation case", () => {
    const string = "CreateServiceProviderService";

    expect(camelCaseToN(string, ".")).toBe("create.service.provider.service");
  });

  it("should convert a given camel case string to snake case by default", () => {
    const string = "CreateServiceProviderService";

    expect(camelCaseToN(string)).toBe("create_service_provider_service");
  });

  it("should fail if not provided a valid string", () => {
    const string = fakeStr();

    expect(() => camelCaseToN(string, ".")).toThrow(
      Error("first argument must be a string")
    );
  });
});
