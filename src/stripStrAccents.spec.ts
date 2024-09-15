import { describe, expect, it } from "vitest";

import { stripStrAccents } from "./stripStrAccents";

describe("Test stripStrAccents util", () => {
  it("should strip accents from a given string", () => {
    const stringWithAccents = "A maça que é vista pelos que têm paixão";
    const stringWithNoAccents = "A maca que e vista pelos que tem paixao";

    expect(stripStrAccents(stringWithAccents)).toEqual(stringWithNoAccents);
  });
});
