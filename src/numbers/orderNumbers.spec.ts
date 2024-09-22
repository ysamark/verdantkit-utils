import { describe, expect, it } from "vitest";

import { orderNumbers } from "./orderNumbers";

describe("Test orderNumbers numbers util", () => {
  it("should order a given set of numbers", () => {
    expect(orderNumbers(4, 2, 9, 0, 3, 1)).toStrictEqual([0, 1, 2, 3, 4, 9]);
  });

  it("should order a given set of numbers as an array", () => {
    expect(orderNumbers([4, 2, 9, 0, 8, 3, 1])).toStrictEqual([
      0, 1, 2, 3, 4, 8, 9,
    ]);
  });
});
