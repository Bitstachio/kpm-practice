import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import TaskItem from "./TaskItem.tsx";
import type { Task } from "../TaskManager/TaskManager.tsx";
import "@testing-library/jest-dom/vitest";
import { generateTestId } from "../../utils/string-utils.ts"; // Required by not automatically imported by IDE
import styles from "./TaskItem.module.css";
import userEvent from "@testing-library/user-event";

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
  });

  it("renders correctly when not completed and not in edit mode", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: false };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(
      screen.getByTestId(generateTestId(component, "article", "container-task", String(mockTaskId))),
    ).not.toHaveClass(styles["completed"]);
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

  it("renders correctly when completed but not in edit mode", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: true, editMode: false };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(screen.getByTestId(generateTestId(component, "article", "container-task", String(mockTaskId)))).toHaveClass(
      styles["completed"],
    );
    expect(screen.getByTestId(generateTestId(component, "input", "completed", String(mockTaskId)))).toBeChecked();
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

  it("renders correctly when not completed but in edit mode", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(
      screen.getByTestId(generateTestId(component, "article", "container-task", String(mockTaskId))),
    ).not.toHaveClass(styles["completed"]);
    expect(screen.getByTestId(generateTestId(component, "input", "completed", String(1)))).not.toBeChecked();
    // `editMode: false` elements
    expect(screen.queryByTestId(generateTestId(component, "p", "content", String(1)))).not.toBeInTheDocument();
    expect(screen.queryByTestId(generateTestId(component, "button", "edit", String(1)))).not.toBeInTheDocument();
    expect(screen.queryByTestId(generateTestId(component, "button", "delete", String(1)))).not.toBeInTheDocument();
    // `editMode: true` elements
    expect(screen.getByTestId(generateTestId(component, "input", "content", String(1)))).toHaveValue("sample task");
    expect(screen.getByTestId(generateTestId(component, "button", "save", String(1)))).toBeDisabled();
    expect(screen.getByTestId(generateTestId(component, "button", "cancel", String(1)))).toBeEnabled();
  });

  it("renders correctly when completed and in edit mode", () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: true, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    expect(screen.getByTestId(generateTestId(component, "article", "container-task", String(mockTaskId)))).toHaveClass(
      styles["completed"],
    );
    expect(screen.getByTestId(generateTestId(component, "input", "completed", String(mockTaskId)))).toBeChecked();
    // `editMode: false` elements
    expect(screen.queryByTestId(generateTestId(component, "p", "content", String(1)))).not.toBeInTheDocument();
    expect(screen.queryByTestId(generateTestId(component, "button", "edit", String(1)))).not.toBeInTheDocument();
    expect(screen.queryByTestId(generateTestId(component, "button", "delete", String(1)))).not.toBeInTheDocument();
    // `editMode: true` elements
    expect(screen.getByTestId(generateTestId(component, "input", "content", String(1)))).toHaveValue("sample task");
    expect(screen.getByTestId(generateTestId(component, "button", "save", String(1)))).toBeDisabled();
    expect(screen.getByTestId(generateTestId(component, "button", "cancel", String(1)))).toBeEnabled();
  });

  it("enables the save button when the user adds new content", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    const inputContent = screen.getByTestId(generateTestId(component, "input", "content", String(mockTaskId)));
    const moreContent = "more content";
    await user.type(inputContent, moreContent);

    expect(inputContent).toHaveValue(mockTaskContent + moreContent);
    expect(screen.getByTestId(generateTestId(component, "button", "save", String(mockTaskId)))).toBeEnabled();
  });

  // Note: This test case assumes that the current content contains at least 1 lowercase letter
  it("enables the save button when the user changes the original casing", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    const inputContent = screen.getByTestId(generateTestId(component, "input", "content", String(mockTaskId)));
    await user.clear(inputContent);
    await user.type(inputContent, mockTaskContent.toUpperCase());

    expect(screen.getByTestId(generateTestId(component, "button", "save", String(mockTaskId)))).toBeEnabled();
  });

  it("keeps the save button disabled when the user adds only whitespace", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    const inputContent = screen.getByTestId(generateTestId(component, "input", "content", String(mockTaskId)));
    const moreContent = " ";
    await user.type(inputContent, moreContent);

    expect(inputContent).toHaveValue(mockTaskContent + moreContent);
    expect(screen.getByTestId(generateTestId(component, "button", "save", String(mockTaskId)))).toBeDisabled();
  });

  it("handles 'Edit' button click", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: false };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId(generateTestId(component, "button", "edit", String(mockTaskId))));

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).toHaveBeenCalledWith({ ...mockTask, editMode: true });
    expect(mockDeleteTask).not.toHaveBeenCalled();
  });

  it("handles 'Delete' button click", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: false };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId(generateTestId(component, "button", "delete", String(mockTaskId))));

    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  it("handles 'Save' button click", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    const moreContent = "more content";
    await user.type(screen.getByTestId(generateTestId(component, "input", "content", String(mockTaskId))), moreContent);
    await user.click(screen.getByTestId(generateTestId(component, "button", "save", String(mockTaskId))));

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).toHaveBeenCalledWith({
      ...mockTask,
      content: mockTaskContent + moreContent,
      editMode: false,
    });
    expect(mockDeleteTask).not.toHaveBeenCalled();
  });

  it("handles 'Cancel' button click", async () => {
    const mockTask: Task = { id: mockTaskId, content: mockTaskContent, completed: false, editMode: true };
    render(<TaskItem task={mockTask} onUpdateTask={mockUpdateTask} onDeleteTask={mockDeleteTask} />);

    const user = userEvent.setup();
    const inputContent = screen.getByTestId(generateTestId(component, "input", "content", String(mockTaskId)));
    await user.type(inputContent, "more content");
    await user.click(screen.getByTestId(generateTestId(component, "button", "cancel", String(mockTaskId))));

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).toHaveBeenCalledWith({ ...mockTask, editMode: false });
    expect(mockDeleteTask).not.toHaveBeenCalled();
    // Content input field value is managed by internal state; validate here
    expect(inputContent).toHaveValue(mockTaskContent);
  });
});
