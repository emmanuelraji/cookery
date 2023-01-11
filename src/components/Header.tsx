import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

function Header() {
  const { user } = useAuthContext();
  const { logout, isLoading, error } = useLogout();

  return (
    <header className="bg-white mb-4">
      <div className="h-12 px-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="font-extrabold">cookery</h1>
        </Link>
        <ul className="flex gap-4">
          {user && (
            <>
              <li>hello, {user.email}</li>
              <li>
                <button onClick={logout}>logout</button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Create account</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
