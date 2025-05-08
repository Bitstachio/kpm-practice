import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import TaskItem from "./TaskItem.tsx";
import type { Task } from "../TaskManager/TaskManager.tsx";
import "@testing-library/jest-dom/vitest";
import { generateTestId } from "../../utils/string-utils.ts"; // Required by not automatically imported by IDE

const component = "TaskItem";

describe(component, () => {
  // Constants
  const mockTaskId = 1;
  const mockTaskContent = "sample task";

  // Mocks
  let mockUpdateTask: Mock;
  let mockDeleteTask: Mock;

  beforeEach(() => {
    mockUpdateTask = vi.fn();
    mockDeleteTask = vi.fn();
  });

  // TODO: Temporary fix; figure out why auto-cleanup is not working
  afterEach(() => {
    cleanup();
  })

  it("renders correctly", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: false };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(screen.getByTestId(generateTestId(component, "input", "completed", String(mockTaskId)))).not.toBeChecked();
    // `editMode: false` elements
    expect(screen.getByTestId(generateTestId(component, "p", "content", String(mockTaskId)))).toHaveTextContent(
      mockTaskContent,
    );
    expect(screen.getByTestId(generateTestId(component, "button", "edit", String(mockTaskId)))).toBeEnabled();
    expect(screen.getByTestId(generateTestId(component, "button", "delete", String(mockTaskId)))).toBeEnabled();
    // `editMode: true` elements
    expect(
      screen.queryByTestId(generateTestId(component, "input", "content", String(mockTaskId))),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateTestId(component, "button", "save", String(mockTaskId))),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateTestId(component, "button", "cancel", String(mockTaskId))),
    ).not.toBeInTheDocument();
  });

  it("renders correctly in edit mode", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(screen.getByTestId(generateTestId(component, "input", "completed", String(1)))).not.toBeChecked();
    // `editMode: false` elements
    expect(screen.queryByTestId(generateTestId(component, "p", "content", String(1)))).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateTestId(component, "button", "edit", String(1))),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateTestId(component, "button", "delete", String(1))),
    ).not.toBeInTheDocument();
    // `editMode: true` elements
    expect(screen.getByTestId(generateTestId(component, "input", "content", String(1)))).toHaveValue(
      "sample task",
    );
    expect(screen.getByTestId(generateTestId(component, "button", "save", String(1)))).toBeDisabled();
    expect(screen.getByTestId(generateTestId(component, "button", "cancel", String(1)))).toBeEnabled();
  });
});
