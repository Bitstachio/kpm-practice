import styles from "./TaskList.module.css";
import type { TaskMaintenanceProps, Task } from "../TaskManager/TaskManager.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";

interface TaskListProps extends TaskMaintenanceProps {
  tasks: Task[];
}

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) => {
  return (
    <ul className={styles["task-list"]}>
      {tasks.length === 0 ? (
        <p>There are currently no tasks.</p>
      ) : (
        tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
