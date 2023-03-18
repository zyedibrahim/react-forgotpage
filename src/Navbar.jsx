import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className=" navbar navbar-expand-md bg-primary text-light navbar-dark">
      <div className="container">
        <span>URL SHORTNER</span>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#mynav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" navbar-collapse " id="mynav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item active ">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item  ">
              <Link to={"/signup"} className="nav-link">
                Signup
              </Link>
            </li>
            <li className="nav-item ">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
