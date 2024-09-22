import { describe, expect, it } from "vitest";

import { regReplaceCallback } from "./regReplaceCallback";

describe("Test regReplaceCallback util", () => {
  it("should replace all the match for a given regex with a given string content", () => {
    const str = "Foo Bar is also Foo... Say mooooooo!";

    expect(regReplaceCallback(/o+/i, str, () => "-")).toBe(
      "F- Bar is als- F-... Say m-!"
    );
  });

  it("should return the given string if regex does not match it", () => {
    const str = "Foo Bar is also Foo... Say mooooooo!";

    expect(regReplaceCallback(/z+/i, str, () => "-")).toBe(str);
  });
});
