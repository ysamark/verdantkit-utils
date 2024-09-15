import { describe, expect, it } from "vitest";

import { arrayMerge, arraySplit } from "./arrays";

describe("Test arrays utils", () => {
  it("should split a given array", () => {
    const myArray: Array<number> = Array.from({ length: 100 }).map((_, i) => i);

    const splittedArray = arraySplit(myArray, 10);

    let i = 0;

    const expectedResultArray = Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).map(() => i++)
    );

    expect(splittedArray).toMatchObject(expectedResultArray);
  });

  it("should merge two or more given array", () => {
    let i = 0;

    const myArray = Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).map(() => i++)
    );

    const expectedResultArray: Array<number> = Array.from({ length: 100 }).map(
      (_, i) => i
    );

    const mergedArrays = arrayMerge(...myArray);

    expect(mergedArrays).toEqual(expectedResultArray);
  });
});
