import type { User } from "../../types/user-types.ts";
import EditableField from "../EditableField/EditableField.tsx";
import { useState } from "react";
import { validateEmail, validatePhoneNumber } from "../../utils/validators.ts";
import { formatLowerCase, formatPhoneNumber } from "../../utils/formatters.ts";

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

  const fieldsAddress: Array<keyof User> = ["address.street", "address.suite", "address.city", "address.zipcode"];
  const fieldsCompany: Array<keyof User> = ["company.name", "company.catchPhrase", "company.bs"];

  const renderFields = (fields: Array<keyof User>, type: "text" | "number") => {
    return fields.map((field) => (
      <EditableField
        userId={user.id}
        type={type}
        field={field}
        value={intermediaryUser[field]}
        onUpdate={updateIntermediaryUser}
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
                <EditableField
                  userId={user.id}
                  type={"text"}
                  field={"username"}
                  value={intermediaryUser.username}
                  onUpdate={updateIntermediaryUser}
                />
                <EditableField
                  userId={user.id}
                  type={"text"}
                  field={"name"}
                  value={intermediaryUser.name}
                  onUpdate={updateIntermediaryUser}
                />
                <EditableField
                  userId={user.id}
                  type={"email"}
                  field={"email"}
                  value={intermediaryUser.email}
                  onUpdate={updateIntermediaryUser}
                  validator={validateEmail}
                  formatter={formatLowerCase}
                />
                <EditableField
                  userId={user.id}
                  type={"tel"}
                  field={"phone"}
                  value={intermediaryUser.phone}
                  onUpdate={updateIntermediaryUser}
                  validator={validatePhoneNumber}
                  formatter={formatPhoneNumber}
                />
                <EditableField
                  userId={user.id}
                  type={"text"}
                  field={"website"}
                  value={intermediaryUser.website}
                  onUpdate={updateIntermediaryUser}
                  formatter={formatLowerCase}
                />
              </section>
            </div>
            <div className="flex-fill">
              <section>
                <h5>Address</h5>
                {renderFields(fieldsAddress, "text")}
              </section>
              <section>
                <h5>Company</h5>
                {renderFields(fieldsCompany, "text")}
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
