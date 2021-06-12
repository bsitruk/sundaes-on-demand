import { toCurrency } from "../toCurrency";

describe("toCurrency", () => {
  it("should handles integers", () => {
    expect(toCurrency(2)).toBe("$2.00");
  });

  it("should handles float", () => {
    expect(toCurrency(3.456)).toBe("$3.46");
  });
});
