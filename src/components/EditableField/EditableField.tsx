import { generateId } from "../../utils/string-utils.ts";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

type EditableFieldProps = {
  userId: number;
  type: "text" | "number" | "email" | "";
  label: string;
  content: string;
};

const EditableField = ({ userId, type, label, content }: EditableFieldProps) => {
  const [newContent, setNewContent] = useState(content);
  const [editMode, setEditMode] = useState(false);

  return (
    <section className="row align-items-center mb-2">
      <label className="col-3 col-form-label" htmlFor={generateId(EditableField.name, "input", label, String(userId))}>
        {label}
      </label>
      <div className="col-5">
        <input
          type={type}
          value={newContent}
          className={"form-control"}
          id={generateId(EditableField.name, "input", "username", String(userId))}
          disabled={!editMode}
          onChange={(e) => setNewContent(e.target.value)}
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
