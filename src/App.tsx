import "./App.css";
import Pagination from "./components/UserList/Pagination.tsx";
import UserList from "./components/UserList/UserList.tsx";

function App() {
  return (
    <>
      <article className="d-flex flex-column align-items-center">
        <UserList />
        <Pagination pageCurrent={1} pageTotal={3} />
      </article>
    </>
  );
}

export default App;
