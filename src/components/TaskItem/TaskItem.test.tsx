import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskItem from "./TaskItem.tsx";
import type { Task } from "../TaskManager/TaskManager.tsx";
import "@testing-library/jest-dom/vitest" // Required by not automatically imported by IDE

// TODO: This is just an arbitrary test to validate Vitest setup; remove later.
describe("TaskItem", () => {
  it("renders correctly", () => {
    const task: Task = { id: 1, completed: false, editMode: false, content: "Some arbitrary task." };
    const onUpdate = () => {};
    const onDelete = () => {};
    render(<TaskItem task={task} onUpdateTask={onUpdate} onDeleteTask={onDelete} />);
    expect(screen.getByText("Some arbitrary task.")).toBeInTheDocument();
  });
});
