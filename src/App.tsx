import "./App.css";
import Pagination from "./components/UserList/Pagination.tsx";
import UserList from "./components/UserList/UserList.tsx";
import { useEffect, useState } from "react";
import type { User } from "./types/user-types.ts";
import { flatten } from "flat";
import { formatLowerCase, formatPhoneNumber } from "./utils/formatters.ts";
import { api } from "./api.ts";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const pageSize = 4;

  // Get users from JSONPlaceholder API
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/users", { params: { _page: page, _limit: pageSize } });
      const formattedUsers = response.data.map((user: User) => {
        const flatUser = flatten(user) as Record<string, unknown>;
        return {
          ...flatUser,
          email: formatLowerCase(flatUser.email as string),
          phone: formatPhoneNumber(flatUser.phone as string),
          website: formatLowerCase(flatUser.website as string),
        };
      });

      return {
        users: formattedUsers,
        totalCount: parseInt(response.headers["x-total-count"], 10) || 0,
      };
    }
  });

  useEffect(() => {
    if (!data) return;
    setUsers(data.users);
    setUserCount(data.totalCount)
  }, [data]);


  // useEffect(() => {
  //   (async () => {
  //     const response = await api.get("/users", { params: { _page: page, _limit: pageSize } });
  //     setUserCount(parseInt(response.headers["x-total-count"], 10) || 0);
  //     const retrievedUsers = response.data.map((user: User) => {
  //       const flatUser = flatten(user) as Record<string, unknown>;
  //       return {
  //         ...flatUser,
  //         email: formatLowerCase(flatUser.email as string),
  //         phone: formatPhoneNumber(flatUser.phone as string),
  //         website: formatLowerCase(flatUser.website as string),
  //       };
  //     });
  //
  //     setUsers(retrievedUsers);
  //   })();
  // }, [page]);

  // The `/users` endpoint returns all 10 users at once
  // The following code simulates API pagination to validate the UI
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
        <UserList users={users} onUpdate={updateUser} />
        <Pagination page={page} totalPages={Math.ceil(userCount / pageSize)} onUpdate={updatePage} />
      </article>
    </>
  );
}

export default App;
