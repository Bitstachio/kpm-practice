import { describe, expect, it } from "vitest";
import { generateTestId } from "./string-utils.ts";

describe("generateTestId", () => {
  it("returns the correct test ID without index", () => {
    const result = generateTestId("TaskItem", "input", "completed");
    expect(result).toBe("test-TaskItem-input-completed");
  });

  it("returns the correct test ID with index", () => {
    const result = generateTestId("ListItem", "li", "option", "last");
    expect(result).toBe("test-ListItem-li-option-last");
  });

  it("throws an error for an invalid HTML tag without index", () => {
    const invalidElement = "hello";
    expect(() => generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "completed")).toThrowError(
      `Invalid HTML tag name: "${invalidElement}"`,
    );
  });

  it("throws an error for an invalid HTML tag with index", () => {
    const invalidElement = "hello";
    expect(() =>
      generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "completed", "123"),
    ).toThrowError(`Invalid HTML tag name: "${invalidElement}"`);
  });

  it("throws an error when tag casing is wrong without index", () => {
    const invalidElement = "Div";
    expect(() => generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "container")).toThrowError(
      `Invalid HTML tag name: "${invalidElement}"`,
    );
  });

  it("throws an error when tag casing is wrong with index", () => {
    const invalidElement = "Div";
    expect(() =>
      generateTestId("TaskItem", invalidElement as keyof HTMLElementTagNameMap, "container", "123"),
    ).toThrowError(`Invalid HTML tag name: "${invalidElement}"`);
  });
});
