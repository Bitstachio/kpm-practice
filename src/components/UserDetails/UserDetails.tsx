import type { User } from "../../types/user-types.ts";
import styles from "./UserDetails.module.css";
import EditableField from "../EditableField/EditableField.tsx";

type UserDetailsProps = {
  user: User;
  onUpdate: <K extends keyof User>(id: number, field: K, value: User[K]) => void;
  onClose: () => void;
};

const UserDetails = ({ user, onUpdate, onClose }: UserDetailsProps) => {
  return (
    // Bootswatch hides `modal` by default; `show d-block` forces display as React handles visibility
    <div className="modal show d-block">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user.companyName}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className={`modal-body ${styles["container-details"]}`}>
            <section className={styles["detail-group"]}>
              <h3>Contact</h3>
              <EditableField
                userId={user.id}
                type={"text"}
                field={"username"}
                value={user.username}
                onUpdate={() => {}}
              />
              <EditableField userId={user.id} type={"email"} field={"email"} value={user.email} onUpdate={onUpdate} />
              <EditableField userId={user.id} type={"number"} field={"phone"} value={user.phone} onUpdate={onUpdate} />
              <EditableField
                userId={user.id}
                type={"text"}
                field={"website"}
                value={user.website}
                onUpdate={onUpdate}
              />
            </section>
            <section className={styles["detail-group"]}>
              <h3>Address</h3>
              <p>
                {user.street}, {user.suite}
              </p>
              <p>
                {user.city}, {user.zipcode}
              </p>
            </section>
            <section className={styles["detail-group"]}>
              <h3>Company</h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Catch Phrase:</strong> {user.catchPhrase}
              </p>
              <p>
                <strong>Business:</strong> {user.bs}
              </p>
            </section>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
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
