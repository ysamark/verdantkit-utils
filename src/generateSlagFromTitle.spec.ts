import { describe, expect, it } from "vitest";
import { generateSlagFromTitle } from "./generateSlagFromTitle";

describe("Test generateSlagFromTitle util", () => {
  it("should generate a slag without signature given a title string", () => {
    const title = "How to create a React styled component";

    const slag = generateSlagFromTitle(title);

    expect(slag).toEqual("how-to-create-a-react-styled-component");
  });

  it("should generate a slag without signature given an options object with a title string", () => {
    const title = "How to create a React styled component";

    const slag = generateSlagFromTitle({
      title,
    });

    expect(slag).toEqual("how-to-create-a-react-styled-component");
  });

  it("should generate a slag with signature given a title string", () => {
    const title = "How to create a React styled component";

    const slag = generateSlagFromTitle(title, true);

    expect(slag).toMatch(/^how-to-create-a-react-styled-component-([0-9]+)$/);
  });
});
