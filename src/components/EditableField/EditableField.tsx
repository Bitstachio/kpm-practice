import { generateId, parseInputValue, toTitleCase } from "../../utils/string-utils.ts";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useState } from "react";
import type { User } from "../../types/user-types.ts";
import { FaXmark } from "react-icons/fa6";

type EditableFieldProps<K extends keyof User> = {
  userId: number;
  type: "text" | "number" | "email" | "tel" | "";
  field: K;
  value: User[K];
  onUpdate: (field: K, value: User[K]) => void;
  label?: string;
  validator?: (value: User[K]) => boolean;
  formatter?: (value: User[K]) => User[K];
};

const EditableField = <K extends keyof User>({
  userId,
  type,
  field,
  value,
  onUpdate,
  label,
  validator,
  formatter,
}: EditableFieldProps<K>) => {
  const [newValue, setNewValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <section className="row align-items-center mb-2">
      <label className="col-3 col-form-label" htmlFor={generateId(EditableField.name, "input", field, String(userId))}>
        {label
          ? label
          : (() => {
              const partitions = field.split(".");
              return toTitleCase(partitions[partitions.length - 1]);
            })()}
      </label>
      <div className="col-5">
        <input
          type={type}
          value={newValue}
          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
          id={generateId(EditableField.name, "input", "username", String(userId))}
          disabled={!editMode}
          onChange={(e) => setNewValue(parseInputValue<User[K]>(e.target.value, type))}
        />
      </div>
      <div className="col-2 d-flex gap-1">
        {editMode ? (
          <>
            <button
              className="btn btn-success"
              onClick={() => {
                if (validator && !validator(newValue)) {
                  setIsInvalid(true);
                } else {
                  const formattedValue = formatter ? formatter(newValue) : newValue;
                  setNewValue(formattedValue);
                  onUpdate(field, formattedValue);
                  setEditMode(false);
                  setIsInvalid(false);
                }
              }}
            >
              <FaCheck />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setNewValue(value);
                setEditMode(false);
                setIsInvalid(false);
              }}
            >
              <FaXmark />
            </button>
          </>
        ) : (
          <button className="btn text-dark p-0 border-0" onClick={() => setEditMode(true)}>
            <FaEdit />
          </button>
        )}
      </div>
    </section>
  );
};

export default EditableField;
