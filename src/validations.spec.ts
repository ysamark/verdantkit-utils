import { describe, expect, it } from "vitest";

import { validAngolanPhoneNumber } from "./validations";

describe("Test validation utils", () => {
  describe("Test validAngolanPhoneNumber util", () => {
    it("should be truthy given a valid Angolan phone number with ddd", () => {
      const phoneNumber = "+244923285171";

      expect(validAngolanPhoneNumber(phoneNumber)).toBeTruthy();
    });

    it("should be truthy given a valid Angolan phone number without ddd", () => {
      const phoneNumber = "923285171";

      expect(validAngolanPhoneNumber(phoneNumber)).toBeTruthy();
    });

    it("should be falsy given a invalid Angolan phone number with wrong ddd", () => {
      const phoneNumber = "+24983285171";

      expect(validAngolanPhoneNumber(phoneNumber)).toBeFalsy();
    });

    it("should be falsy given a invalid Angolan phone number", () => {
      const phoneNumber = "983285171";

      expect(validAngolanPhoneNumber(phoneNumber)).toBeFalsy();
    });
  });
});
