import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white">
      <div className="h-12 px-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="font-extrabold">cookery</h1>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Create account</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
