import "./TaskItem.css";
import { useState } from "react";
import type { TaskMaintenanceProps, Task } from "../TaskManager/TaskManager.tsx";

interface TaskItemProps extends TaskMaintenanceProps {
  task: Task;
}

const TaskItem = ({ task, onUpdateTask, onDeleteTask }: TaskItemProps) => {
  const [newContent, setNewContent] = useState(task.content);

  return (
    <article className="task">
      <input
        className="form-check-input"
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdateTask({ ...task, completed: e.target.checked })}
      />
      {task.editMode ? (
        <>
          <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          <button
            type="button"
            className="btn btn-primary"
            disabled={!isNewContentValid(task.content, newContent)}
            onClick={() => {
              onUpdateTask({ ...task, editMode: false, content: newContent });
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary"
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
          <p>{task.content}</p>
          <button type="button" className="btn btn-primary" onClick={() => onUpdateTask({ ...task, editMode: true })}>
            Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onDeleteTask(task.id)}>
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
