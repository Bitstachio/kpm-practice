import "./App.css";
import Pagination from "./components/UserList/Pagination.tsx";
import UserList from "./components/UserList/UserList.tsx";
import { useEffect, useState } from "react";
import type { User } from "./types/user-types.ts";
import { flatten } from "flat";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  // Get users from JSONPlaceholder API
  const url = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const dataUsers = await response.json();

        const flattenedUsers = dataUsers.map((user: any) => flatten(user));
        setUsers(flattenedUsers);
      } catch (err) {
        let message = "An unknown error occurred.";
        if (err instanceof Error) {
          message = err.message;
        }
        console.log(message);
      }
    })();
  }, []);

  // The `/users` endpoint returns all 10 users at once
  // The following code simulates API pagination to validate the UI
  const pageSize = 4;
  const totalSize = users.length;
  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  const updateUser = (user: User): void => {
    if (!users.some((u) => u.id === user.id)) {
      throw new Error("TaskItem ID does not exist.");
    }
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const updatePage = (page: number): void => {
    setPage(page);
  };

  return (
    <>
      <article className="d-flex flex-column align-items-center">
        <UserList users={paginatedUsers} onUpdate={updateUser} />
        <Pagination page={page} totalPages={Math.floor(totalSize / pageSize + 0.5)} onUpdate={updatePage} />
      </article>
    </>
  );
}

export default App;
