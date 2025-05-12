import type { User } from "../../types/user-types.ts";
import { useState } from "react";
import UserDetails from "../UserDetails/UserDetails.tsx";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      companyName: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      companyName: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      phone: "1-463-123-4447",
      website: "ramiro.info",
      companyName: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  ]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const updateUser = (user: User): void => {
    if (!users.some((u) => u.id === user.id)) {
      throw new Error("TaskItem ID does not exist.");
    }
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const handleClose = () => {
    setExpandedUserId(null);
  };

  return (
    <table className={`table table-hover ${styles["container-users"]}`}>
      <thead>
        <tr className="table-primary">
          <th scope="col" >ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Company</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <>
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.companyName}</td>
              <td>
                <button type="button" className="btn btn-primary" onClick={() => setExpandedUserId(user.id)}>Expand</button>
                {user.id === expandedUserId && <UserDetails user={user} onUpdate={updateUser} onClose={handleClose} />}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
