import type { User } from "../../types/user-types.ts";
import styles from "./UserDetails.module.css";

type UserDetailsProps = {
  user: User;
};

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <article>
      <h1>User Details for {user.name}</h1>
    </article>
  );
};

export default UserDetails;
