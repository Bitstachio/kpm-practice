import { generateId, parseInputValue, toTitleCase } from "../../utils/string-utils.ts";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import type { User } from "../../types/user-types.ts";

type EditableFieldProps<K extends keyof User> = {
  userId: number;
  type: "text" | "number" | "email" | "";
  field: K;
  value: User[K];
  label?: string;
};

const EditableField = <K extends keyof User>({ userId, type, field, value, label }: EditableFieldProps<K>) => {
  const [newValue, setNewValue] = useState(value);
  const [editMode, setEditMode] = useState(false);

  return (
    <section className="row align-items-center mb-2">
      <label className="col-3 col-form-label" htmlFor={generateId(EditableField.name, "input", field, String(userId))}>
        {label ? label : toTitleCase(field)}
      </label>
      <div className="col-5">
        <input
          type={type}
          value={newValue}
          className={"form-control"}
          id={generateId(EditableField.name, "input", "username", String(userId))}
          disabled={!editMode}
          onChange={(e) => setNewValue(parseInputValue<User[K]>(e.target.value, type))}
        />
      </div>
      <div className="col-2 d-flex gap-1">
        <button className="btn btn-primary w-100" onClick={() => setEditMode(true)}>
          <FaEdit />
        </button>
      </div>
    </section>
  );
};

export default EditableField;
