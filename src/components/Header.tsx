import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

function Header() {
  const { user } = useAuthContext();
  const { logout, isLoading, error } = useLogout();

  return (
    <header className="bg-indigo-600 mb-4 text-white">
      <div className="h-12 max-w-2xl m-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="font-extrabold">cookery</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          {user && (
            <>
              <li>Hello, {user.displayName}</li>
              <li>
                <button onClick={logout} className="text-white">
                  Logout
                </button>
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
