import type { User } from "../../types/user-types.ts";
import { useState } from "react";
import UserDetails from "../UserDetails/UserDetails.tsx";
import styles from "./UserList.module.css";

type UserListProps = {
  users: User[];
  onUpdate: (user: User) => void;
};

const UserList = ({ users, onUpdate }: UserListProps) => {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const handleClose = () => {
    setExpandedUserId(null);
  };

  return (
    <table className={`table table-hover ${styles["container-users"]}`}>
      <thead>
        <tr className="table-primary">
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Company</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user["company.name"]}</td>
              <td>
                <button type="button" className="btn btn-primary" onClick={() => setExpandedUserId(user.id)}>
                  Expand
                </button>
                {user.id === expandedUserId && <UserDetails user={user} onUpdate={onUpdate} onClose={handleClose} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
