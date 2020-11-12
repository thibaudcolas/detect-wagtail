const { it, expect } = require("@jest/globals");
const { detectWagtail } = require("./detect-wagtail");

describe("detect-wagtail", () => {
  it("works", () => {
    expect(detectWagtail()).toBe(false);
  });
});
