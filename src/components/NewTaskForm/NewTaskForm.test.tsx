import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import NewTaskForm from "./NewTaskForm.tsx";
import "@testing-library/jest-dom/vitest";
import { generateTestId } from "../../utils/string-utils.ts";
import userEvent from "@testing-library/user-event"; // Required by not automatically imported by IDE

const component = "NewTaskForm";

describe(component, () => {
  // Mocks
  let mockAddTask: Mock;

  beforeEach(() => {
    mockAddTask = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    render(<NewTaskForm onAddTask={mockAddTask} />);

    expect(screen.getByTestId(generateTestId(component, "input", "content"))).toBeInTheDocument();
    expect(screen.getByTestId(generateTestId(component, "button", "add"))).toBeDisabled();
  });

  it("enables 'Add' button when the user adds new content", async () => {
    render(<NewTaskForm onAddTask={mockAddTask} />);

    const user = userEvent.setup();
    await user.type(screen.getByTestId(generateTestId(component, "input", "content")), "some content");

    expect(screen.getByTestId(generateTestId(component, "button", "add"))).toBeEnabled();
  });

  it("keeps 'Add' button disabled when the user adds only whitespace", async () => {
    render(<NewTaskForm onAddTask={mockAddTask} />);

    const user = userEvent.setup();
    await user.type(screen.getByTestId(generateTestId(component, "input", "content")), " ");

    expect(screen.getByTestId(generateTestId(component, "button", "add"))).toBeDisabled();
  });

  it("disables 'Add' button when the input field is cleared", async () => {
    render(<NewTaskForm onAddTask={mockAddTask} />);

    const user = userEvent.setup();
    const inputContent = screen.getByTestId(generateTestId(component, "input", "content"));
    await user.type(inputContent, "more content");
    await user.clear(inputContent);

    expect(screen.getByTestId(generateTestId(component, "button", "add"))).toBeDisabled();
  });

  it("handles 'Add' button click", async () => {
    render(<NewTaskForm onAddTask={mockAddTask} />);

    const user = userEvent.setup();
    const content = "some content";
    await user.type(screen.getByTestId(generateTestId(component, "input", "content")), content);
    await user.click(screen.getByTestId(generateTestId(component, "button", "add")));

    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith(content);
  });
});
