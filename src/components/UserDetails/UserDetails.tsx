import type { User } from "../../types/user-types.ts";
import EditableField from "../EditableField/EditableField.tsx";
import { useState } from "react";
import {
  type EditableFieldConfig,
  fieldConfigsAddress,
  fieldConfigsCompany,
  fieldConfigsContact,
} from "./field-configs.ts";

type UserDetailsProps = {
  user: User;
  onUpdate: (user: User) => void;
  onClose: () => void;
};

const UserDetails = ({ user, onUpdate, onClose }: UserDetailsProps) => {
  const [intermediaryUser, setIntermediaryUser] = useState<User>(user);

  const updateIntermediaryUser = <K extends keyof User>(field: K, value: User[K]) => {
    setIntermediaryUser({ ...intermediaryUser, [field]: value });
  };

  const renderEditableFields = (
    configs: EditableFieldConfig[],
    id: number,
    model: User,
    onUpdate: <K extends keyof User>(field: K, value: User[K]) => void,
  ) => {
    return configs.map((config) => (
      <EditableField
        userId={id}
        type={config.type}
        field={config.field}
        value={model[config.field]}
        onUpdate={onUpdate}
        label={config.label}
        validator={config.validator}
        formatter={config.formatter}
      />
    ));
  };

  return (
    // Bootswatch hides `modal` by default; `show d-block` forces display as React handles visibility
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body d-flex">
            <div className="flex-fill">
              <section>
                <h5>Contact</h5>
                {renderEditableFields(fieldConfigsContact, user.id, intermediaryUser, updateIntermediaryUser)}
              </section>
            </div>
            <div className="flex-fill">
              <section>
                <h5>Address</h5>
                {renderEditableFields(fieldConfigsAddress, user.id, intermediaryUser, updateIntermediaryUser)}
              </section>
              <section>
                <h5>Company</h5>
                {renderEditableFields(fieldConfigsCompany, user.id, intermediaryUser, updateIntermediaryUser)}
              </section>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onUpdate(intermediaryUser);
                onClose();
              }}
            >
              Save changes
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
