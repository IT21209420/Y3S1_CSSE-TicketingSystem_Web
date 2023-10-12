import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import CommonContext from "../context/CommonContext";
import { set } from "mongoose";

const Navbar = ({ title = "Bus Ticketing System" }) => {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const { data, setData, isSearchPressed, setIsSearchPressed } =
    useContext(CommonContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  console.log(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="./" style={{ textDecoration: "none" }}>
          <a className="navbar-brand">{title}</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {currentPage === "/getregistereduser" && (
                  <li className="me-5">
                    <form className="d-flex">
                      <input
                        className="form-control me-sm-2"
                        type="search"
                        placeholder="Search by NIC"
                        onChange={(e) => {
                          setData(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-secondary rounded my-2 my-sm-0"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsSearchPressed(!isSearchPressed);
                        }}
                      >
                        Search
                      </button>
                    </form>
                  </li>
                )}
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out successfully!");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button type="button" class="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="./login" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="./register" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </>
            )}

            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
