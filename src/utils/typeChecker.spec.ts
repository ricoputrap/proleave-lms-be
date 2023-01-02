import { isNumeric } from "./typeChecker";

describe("UTILS - typeChecker.ts", () => {
  test("Function: isNumeric", () => {
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric("1393029")).toBe(true);
    expect(isNumeric("00001232131249")).toBe(true);
    
    expect(isNumeric("a name")).toBe(false);
    expect(isNumeric("FINAL VALUE")).toBe(false);
    expect(isNumeric("+081")).toBe(false);
    expect(isNumeric("adasdasd")).toBe(false);
  });
})