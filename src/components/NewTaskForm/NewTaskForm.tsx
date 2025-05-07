import "./NewTaskForm.css";
import { type FormEvent, useState } from "react";

interface NewTaskFormProps {
  onAddTask: (content: string) => void;
}

const NewTaskForm = ({ onAddTask }: NewTaskFormProps) => {
  const [newContent, setNewContent] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isInputValid(newContent)) {
      throw new Error("Cannot create an empty task.");
    }
    onAddTask(newContent);
    setNewContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-task-new">
      <label htmlFor="task">Task</label>
      <br />
      <input
        type="text"
        className="form-control"
        id="input-new-task-content"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button type="submit" className="btn btn-success" disabled={!isInputValid(newContent)}>
        Add
      </button>
    </form>
  );
};

export default NewTaskForm;

const isInputValid = (content: string) => {
  // `!!` converts any truthy/falsy value into a proper boolean
  // Otherwise, the implicit function return type is `boolean | string`
  return !!content && content.trim() !== "";
};
