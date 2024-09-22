import { describe, expect, it } from "vitest";

import { strReplaceCallBack } from "./strReplaceCallBack";

describe("Test strReplaceCallBack util", () => {
  it("should replace chars matching the given regex with the callback return", () => {
    const str = "A small house is a great plan for builders";

    const newStr = strReplaceCallBack(str, /a/i, () => "-");

    expect(newStr).toBe("- sm-ll house is - gre-t pl-n for builders");
  });

  it("should return the same string if given an invalid regex string", () => {
    const str = "A small house is a great plan for builders";

    const newStr = strReplaceCallBack(str, "/[a/i", () => "-");

    expect(newStr).toBe(str);
  });

  it("should stop matching regex if callback returns the same replaced string to prevent infinite loop", () => {
    const str = "A small house is a great plan for builders";

    const newStr = strReplaceCallBack(str, /a/i, () => "a");

    expect(newStr).toBe(str.toLowerCase());
  });
});
