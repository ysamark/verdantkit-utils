import { describe, expect, it } from "vitest";

import { getUrlQueryParams } from "./getUrlQueryParams";

describe("Test getUrlQueryParams util", () => {
  it("should get query params object given an url object", () => {
    const url = new URL("https://www.foo.bar?name=Foo&email=foobar@baz.com");

    const queryParams = getUrlQueryParams(url);

    expect(queryParams).toMatchObject({
      name: "Foo",
      email: "foobar@baz.com",
    });
  });

  it("should get query params object given an url string", () => {
    const url = "https://www.foo.bar?name=Foo&email=foobar@baz.com";

    const queryParams = getUrlQueryParams(url);

    expect(queryParams).toMatchObject({
      name: "Foo",
      email: "foobar@baz.com",
    });
  });

  it("should get query params object given a raw query params list", () => {
    const url = "?name=Foo&email=foobar@baz.com";

    const queryParams = getUrlQueryParams(url);

    expect(queryParams).toMatchObject({
      name: "Foo",
      email: "foobar@baz.com",
    });
  });
});
