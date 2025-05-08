import styles from "./TaskItem.module.css";
import { useState } from "react";
import type { TaskMaintenanceProps, Task } from "../TaskManager/TaskManager.tsx";
import { generateTestId } from "../../utils/string-utils.ts";

interface TaskItemProps extends TaskMaintenanceProps {
  task: Task;
}

const TaskItem = ({ task, onUpdateTask, onDeleteTask }: TaskItemProps) => {
  const [newContent, setNewContent] = useState(task.content);

  return (
    <article className={`${task.completed ? styles.completed : ""} ${styles["task"]}`}>
      <input
        data-testid={`${generateTestId(TaskItem.name, "input", "completed", String(task.id))}`}
        className={`form-check-input`}
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdateTask({ ...task, completed: e.target.checked })}
      />
      {task.editMode ? (
        <>
          <input
            data-testid={generateTestId(TaskItem.name, "input", "content", String(task.id))}
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            data-testid={generateTestId(TaskItem.name, "button", "save", String(task.id))}
            type="button"
            className={`btn btn-primary`}
            disabled={!isNewContentValid(task.content, newContent)}
            onClick={() => {
              onUpdateTask({ ...task, editMode: false, content: newContent });
            }}
          >
            Save
          </button>
          <button
            data-testid={generateTestId(TaskItem.name, "button", "cancel", String(task.id))}
            type="button"
            className={`btn btn-primary`}
            onClick={() => {
              onUpdateTask({ ...task, editMode: false });
              setNewContent(task.content);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p data-testid={generateTestId(TaskItem.name, "p", "content", String(task.id))}>{task.content}</p>
          <button
            data-testid={generateTestId(TaskItem.name, "button", "edit", String(task.id))}
            type="button"
            className={`btn btn-primary`}
            onClick={() => onUpdateTask({ ...task, editMode: true })}
          >
            Edit
          </button>
          <button
            data-testid={generateTestId(TaskItem.name, "button", "delete", String(task.id))}
            type="button"
            className={`btn btn-danger`}
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </article>
  );
};

export default TaskItem;

const isNewContentValid = (originalContent: string, newContent: string) => {
  return newContent.trim().length > 0 && newContent !== originalContent;
};
