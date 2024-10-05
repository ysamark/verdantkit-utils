import { describe, expect, it } from "vitest";
import { camelCaseToTrainCase } from "./camelCaseToTrainCase";

describe("Test camelCaseToTrainCase strings util", () => {
  it("should train a given camel case string", () => {
    const camelCaseString = "appModuleMainController";

    expect(camelCaseToTrainCase(camelCaseString)).toBe(
      "App-Module-Main-Controller"
    );
  });
});
