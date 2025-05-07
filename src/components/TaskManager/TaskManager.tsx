import { useState } from "react";
import TaskList from "../TaskList/TaskList.tsx";
import NewTaskForm from "../NewTaskForm/NewTaskForm.tsx";

let taskId = 1;

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onAddTask = (content: string) => {
    setTasks([...tasks, { id: taskId++, content: content.trim(), completed: false, editMode: false }]);
  };

  const onUpdateTask = (task: Task) => {
    if (!tasks.some((t) => t.id === task.id)) {
      throw new Error("TaskItem ID does not exist.");
    }
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <section>
      <NewTaskForm onAddTask={onAddTask} />
      <TaskList tasks={tasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
    </section>
  );
};

export default TaskManager;

export type Task = {
  readonly id: number;
  content: string;
  completed: boolean;
  editMode: boolean;
};

export interface TaskMaintenanceProps {
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}
