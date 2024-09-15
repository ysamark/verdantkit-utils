import { describe, expect, it } from "vitest";

import { Hash } from ".";

describe("Test Hash helper class", () => {
  it("should hash a given password using bcrypt", async () => {
    const password = "123456789";
    const passwordHash = await Hash.make(password);

    expect(passwordHash).toMatch(/^(\$2a\$([0-9]+)\$(.+))$/);
  });

  it("should be truthy matching a valid hash to the correct password", async () => {
    const password = "123456789";
    const passwordHash =
      "$2a$08$hmQ1EP4CviIJhnQD4O4d7OJYdQElkzZo31iEUxrZXsJ26G7Opwuzy";

    expect(await Hash.compare(password, passwordHash)).toBeTruthy();
  });

  it("should be falsy matching a valid hash to a wrong password", async () => {
    const password = "1234";
    const passwordHash =
      "$2a$08$hmQ1EP4CviIJhnQD4O4d7OJYdQElkzZo31iEUxrZXsJ26G7Opwuzy";

    expect(await Hash.compare(password, passwordHash)).toBeFalsy();
  });
});
