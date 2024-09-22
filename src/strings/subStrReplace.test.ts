import { describe, expect, it } from "vitest";

import { fakeStr } from "~/tests/utils";

import { subStrReplace } from "./subStrReplace";

describe("Test sutStrReplace util", () => {
  it("should replace a range of chars in a string with a given string", () => {
    const str = "Lorem ipsum dolor sit ame...";

    expect(subStrReplace(str, 4, 8, "---")).toBe("Lore---sum dolor sit ame...");
  });

  it("should fail if not provided a valid string as the first argument", () => {
    const str = fakeStr();

    expect(() => subStrReplace(str, 4, 8, "---")).toThrow(
      TypeError("first argument must be a string")
    );
  });
});
