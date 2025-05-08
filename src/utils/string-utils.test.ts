import { describe, expect, it } from "vitest";
import { generateTestId } from "./string-utils.ts";

describe("generateTestId", () => {
  it("returns the correct test ID for valid HTML tag 1", () => {
    const result = generateTestId("TaskItem", "input", "completed");
    expect(result).toBe("test-TaskItem-input-completed");
  });

  it("returns the correct test ID for valid HTML tag 2", () => {
    const result = generateTestId("FormComponent", "form", "submit");
    expect(result).toBe("test-FormComponent-form-submit");
  });

  it("throws an error for an invalid HTML tag", () => {
    const invalidElement = "hello";
    expect(() => generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "completed")).toThrowError(
      `Invalid HTML tag name: "${invalidElement}"`,
    );
  });

  it("throws an error when tag casing is wrong", () => {
    const invalidElement = "Div";
    expect(() => generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "container")).toThrowError(
      `Invalid HTML tag name: "${invalidElement}"`,
    );
  });
});
