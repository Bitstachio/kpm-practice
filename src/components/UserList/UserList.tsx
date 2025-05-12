import type { User } from "../../types/user-types.ts";
import { useEffect, useState } from "react";
import UserDetails from "../UserDetails/UserDetails.tsx";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateUser = (user: User): void => {
    if (!users.some((u) => u.id === user.id)) {
      throw new Error("TaskItem ID does not exist.");
    }
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const handleClose = () => {
    setExpandedUserId(null);
  };

  // Get users from JSONPlaceholder API
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const dataUsers = await response.json();
        setUsers(dataUsers);
      } catch (err) {
        let message = "An unknown error occurred.";
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      }
    })();
  }, []);

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
        {users.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.companyName}</td>
            <td>
              <button type="button" className="btn btn-primary" onClick={() => setExpandedUserId(user.id)}>
                Expand
              </button>
              {user.id === expandedUserId && <UserDetails user={user} onUpdate={updateUser} onClose={handleClose} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
