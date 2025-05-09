import type { User } from "../../types/user-types.ts";
import styles from "./UserDetails.module.css";
import EditableField from "../EditableField/EditableField.tsx";

type UserDetailsProps = {
  user: User;
};

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    // Bootswatch hides `modal` by default; `show d-block` forces display as React handles visibility
    <div className="modal show d-block">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className={`modal-body ${styles["container-details"]}`}>
            <section className={styles["detail-group"]}>
              <h3>Contact</h3>
              <EditableField userId={user.id} type={"text"} label={"Username"} content={user.username} />
              <EditableField userId={user.id} type={"email"} label={"Email"} content={user.username} />
              <EditableField userId={user.id} type={"number"} label={"Phone"} content={user.phone} />
              <EditableField userId={user.id} type={"text"} label={"Website"} content={user.website} />
            </section>
            <section className={styles["detail-group"]}>
              <h3>Address</h3>
              <p>
                {user.address.street}, {user.address.suite}
              </p>
              <p>
                {user.address.city}, {user.address.zipcode}
              </p>
            </section>
            <section className={styles["detail-group"]}>
              <h3>Company</h3>
              <p>
                <strong>Name:</strong> {user.company.name}
              </p>
              <p>
                <strong>Catch Phrase:</strong> {user.company.catchPhrase}
              </p>
              <p>
                <strong>Business:</strong> {user.company.bs}
              </p>
            </section>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
